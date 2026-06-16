from django.db.models import Sum, Q, F, Max, FloatField, Count, ExpressionWrapper, FloatField, Avg, Min
from django.db.models.functions import ExtractYear
from rest_framework.response import Response
from django.db.models.functions import TruncMonth
from rest_framework.viewsets import ViewSet
from rest_framework import viewsets, status

from library.services.Days import dias
from .serializers import *
from .models import *

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class GenresViewSet(viewsets.ModelViewSet):
    queryset = Genres.objects.all()
    serializer_class = GenresSerializer

class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return LibraryListSerializer
        return LibraryDetailSerializer

class PlaySessionViewSet(viewsets.ModelViewSet):
    queryset = PlaySession.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return PlaySessionCreateSerializer
        return PlaySessionReadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        session = serializer.save()

        read_serializer = PlaySessionReadSerializer(session)
        return Response(
            read_serializer.data,
            status=status.HTTP_201_CREATED
        )

class AchievementProgressViewSet(viewsets.ModelViewSet):
    queryset = AchievementProgress.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return AchievementProgressCreateSerializer
        return AchievementProgressReadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        progress = serializer.save()

        read_serializer = AchievementProgressReadSerializer(progress)
        return Response(
            read_serializer.data,
            status=status.HTTP_201_CREATED
        )

class WishViewSet(viewsets.ModelViewSet):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer

class StatsViewSet(ViewSet):

    def list(self, request):
        return self._global_stats(request)

    def retrieve(self, request, pk=None):
        if not pk.isdigit():
            return Response({"error": "Year must be numeric"}, status=400)

        return self._year_stats(request, int(pk))

    def _global_stats(self, request):

        # KPI Principales
        total_juegos = Library.objects.count()    
        total_deseados = Wish.objects.count()
        total_horas = (PlaySession.objects.aggregate(total=Sum('horas'))['total']or 0)
        total_precio = (Library.objects.aggregate(total=Sum('precio'))['total']or 0)
        total_almacenamiento = (Library.objects.aggregate(total=Sum('almacenamiento'))['total']or 0)

        juegos_comenzado = (Library.objects.annotate(horas=Sum('play_sessions__horas')).filter(horas__gt=0).count())
        juegos_terminados = Library.objects.filter(fecha_terminado__isnull=False).count()
        
        # Promedios
        total_JuegosP =  Library.objects.filter(precio__isnull=False,precio__gt=0).count()
        prom_Precio = total_precio / total_JuegosP
        prom_horas = total_horas / juegos_comenzado
        prom_Alm = total_almacenamiento / total_juegos
        precio_por_hora_qs = (
        Library.objects
            .annotate(horas=Sum('play_sessions__horas'))
            .filter(horas__gt=0, precio__gt=0)
            .annotate(
                precio_por_hora=ExpressionWrapper(
                    F('precio') / F('horas'),
                    output_field=FloatField()
                )
            )
        )

        prom_hora = precio_por_hora_qs.aggregate(
            promedio=Avg('precio_por_hora')
        )['promedio'] or 0

        # Logros
        logros_completados = (AchievementProgress.objects.aggregate(total=Sum('cantidad'))['total']or 0)
        logros_totales = (Library.objects.aggregate(total=Sum('logros_Cantidad'))['total']or 0)
        logros_porcentaje = (logros_completados * 100) / logros_totales
        comenzados = (Library.objects.annotate(horas=Sum('play_sessions__horas')).filter(horas__gt=0).count())

        # Top Juego logros
        top_game = (
            Library.objects
            .filter(logros_Cantidad__gt=0)  # excluye 0 y NULL
            .annotate(
                logros_obtenidos=Sum('achievement_progress__cantidad')
            )
            .filter(logros_obtenidos__gt=0)  # solo juegos con progreso real
        )
        
        top_game = top_game.annotate(
            porcentaje=ExpressionWrapper(
                F('logros_obtenidos') * 100.0 / F('logros_Cantidad'),
                output_field=FloatField()
            )
        )
        
        top_game = (top_game.order_by('-porcentaje', '-logros_obtenidos').first())

        top_por = {
            "id": top_game.id,
            "nombre": top_game.nombre,
            "porcentaje": round(top_game.porcentaje, 1),
            "logros_completados": top_game.logros_obtenidos or 0,
            "logros_totales": top_game.logros_Cantidad,
            "imagen": request.build_absolute_uri(top_game.imagenP.url) if top_game.imagenP else None
        }
        
        # Porcentajes
        Por_termindado = (juegos_terminados * 100) / total_juegos  
        Por_Comenzados = (comenzados * 100) / total_juegos  
        
        # Distribucion de precio
        games = Library.objects.filter(precio__gt=0)

        max_price = games.aggregate(max=Max('precio'))['max'] or 0

        distribution = []
        current = 0

        while current < max_price:
            next_range = current + 20000
            count = games.filter(precio__gt=current,precio__lte=next_range).count()
            distribution.append({"range": f"{current//1000}-{next_range//1000}K","count": count})
            current = next_range

       # Por Hora
        com = (
            Library.objects
            .annotate(horas=Sum('play_sessions__horas'))
            .filter(horas__gt=0, precio__gt=0)
            .annotate(
                precio_por_hora=ExpressionWrapper(
                    F('precio') / F('horas'),
                    output_field=FloatField()
                )
            )
        )

        por_hora_raw = [
            {
                "range": "-100",
                "count": com.filter(precio_por_hora__lt=100).count()
            },
            {
                "range": "100-500",
                "count": com.filter(
                    precio_por_hora__gte=100,
                    precio_por_hora__lt=500
                ).count()
            },
            {
                "range": "500-1k",
                "count": com.filter(
                    precio_por_hora__gte=500,
                    precio_por_hora__lt=1000
                ).count()
            },
            {
                "range": "1k-2.5k",
                "count": com.filter(
                    precio_por_hora__gte=1000,
                    precio_por_hora__lt=2500
                ).count()
            },
            {
                "range": "2.5k-5k",
                "count": com.filter(
                    precio_por_hora__gte=2500,
                    precio_por_hora__lt=5000
                ).count()
            },
            {
                "range": "5k-10k",
                "count": com.filter(
                    precio_por_hora__gte=5000,
                    precio_por_hora__lt=10000
                ).count()
            },
            {
                "range": "10k+",
                "count": com.filter(precio_por_hora__gte=10000).count()
            }
        ]

        # eliminar rangos vacíos
        por_hora = [r for r in por_hora_raw if r["count"] > 0]

        # Distribucion de Years
        sessions = (
            PlaySession.objects
            .annotate(anio=ExtractYear('fecha'))
            .values('anio')
            .annotate(
                horas=Sum('horas'),
                jugados=Count('game', distinct=True)
            )
        )

        terminados = (
            Library.objects
            .filter(fecha_terminado__isnull=False)
            .annotate(anio=ExtractYear('fecha_terminado'))
            .values('anio')
            .annotate(terminados=Count('id'))
        )

        terminados_map = {
            t['anio']: t['terminados']
            for t in terminados
        }

        por_anio = []

        for s in sessions:
            anio = s['anio']
            por_anio.append({
                "year": anio,
                "horas": round(s['horas'] or 0, 1),
                "jugados": s['jugados'],
                "terminados": terminados_map.get(anio, 0)
            })

        # Juegos Top 5
        top_games = (Library.objects.annotate(horas=Sum('play_sessions__horas')).filter(horas__gt=0).order_by('-horas')[:5])
        top_games_data = []

        for game in top_games:
            logros = (AchievementProgress.objects.filter(game=game).aggregate(total=Sum('cantidad'))['total']or 0)
            top_games_data.append({
                "id": game.id,
                "nombre": game.nombre,
                "horas": float(game.horas),
                "logros": logros,
                "terminado": game.fecha_terminado,
                "imagen": request.build_absolute_uri(game.imagenP.url) if game.imagenP else None
            })

        total_precio_jugados = (
            Library.objects
            .annotate(horas=Sum('play_sessions__horas'))
            .filter(horas__gt=0)
            .aggregate(total=Sum('precio'))['total'] or 0
        )

        # =========================
        # Horas por PC
        # =========================
        horas_por_pc = []

        for device in Device.objects.all():
        
            sesiones = PlaySession.objects.filter(
                fecha__gte=device.fecha_inicio
            )

            if device.fecha_fin:
                sesiones = sesiones.filter(
                    fecha__lte=device.fecha_fin
                )

            horas = (
                sesiones.aggregate(
                    total=Sum("horas")
                )["total"] or 0
            )

            horas_por_pc.append({
                "id": device.id,
                "nombre": device.nombre,
                "horas": round(horas, 1)
            })

            # Meses Activos
            meses_activos = (
                PlaySession.objects
                .annotate(mes=TruncMonth("fecha"))
                .values("mes")
                .distinct()
                .count()
            )

            anos = meses_activos // 12
            meses_restantes = meses_activos % 12
        
            partes = []
        
            if anos:
                partes.append(
                    f"{anos} {'año' if anos == 1 else 'años'}"
                )
        
            if meses_restantes:
                partes.append(
                    f"{meses_restantes} {'mes' if meses_restantes == 1 else 'meses'}"
                )
        
            tiempo_jugando = " y ".join(partes)

        return Response({
            "stats": {
                "library":{
                    "total": total_juegos,
                    "precio": int(total_precio),
                    "almacenamiento": float(total_almacenamiento),
                },
                "activity":{
                    "horas": float(total_horas),
                    "dias": dias(total_horas),
                    "terminados": juegos_terminados,
                    "comenzados": comenzados,
                    "por_comenzados": round(Por_Comenzados),
                    "por_terminados": round(Por_termindado),
                    "precio_jugados": int(total_precio_jugados),
                    "tiempo_activo": tiempo_jugando,
                },
                "wish": total_deseados,
            },
            "averages":{
                "precio": int(prom_Precio),
                "horas": round(prom_horas,1),
                "Almacenamiento": round(prom_Alm,1),
                "prom_hora": int(prom_hora),
            },
            "por_Horas": por_hora,
            "logros":{
                "total": logros_totales,
                "completados": logros_completados,
                "porcentaje": round(logros_porcentaje,1),
                "Top_logro": top_por,
            },
            "distribucion": distribution,
            "por_anio": por_anio,
            "top_games": top_games_data,
            "horas_pc": horas_por_pc,
    })

    def _year_stats(self, request, year):
        # Stats
        libreria = Library.objects.count()
        sessions = PlaySession.objects.filter(fecha__year=year)
        juegos_ids = sessions.values_list('game_id', flat=True).distinct()
        total_horas = sessions.aggregate(total=Sum('horas'))['total'] or 0
        total_juegos = juegos_ids.count()
        juegos_precio = Library.objects.filter(id__in=juegos_ids,precio__gt=0).count()

        juegos = Library.objects.filter(id__in=juegos_ids)
        precio_total = juegos.aggregate(total=Sum('precio'))['total'] or 0
        almacenamiento_total = juegos.aggregate(total=Sum('almacenamiento'))['total'] or 0
        
        meses_activos = (
            sessions
            .values_list('fecha__month', flat=True)
            .distinct()
            .count()
        )
        promedio_horas_mes = (
            float(total_horas) / meses_activos
            if meses_activos else 0
        )

        juegos_mes = []

        for month in range(1, 13):
        
            cantidad = (
                sessions
                .filter(fecha__month=month)
                .values('game_id')
                .distinct()
                .count()
            )
        
            if cantidad > 0:
                juegos_mes.append(cantidad)
        
        promedio_juegos_mes = (
            sum(juegos_mes) / len(juegos_mes)
            if juegos_mes else 0
        )

        # Distribucion
        first_play = (PlaySession.objects.filter(game_id__in=juegos_ids).values('game_id').annotate(first_date=Min('fecha')))
        
        juegos_nuevos = 0
        juegos_viejos = 0
        for g in first_play:
            if g['first_date'].year == year:
                juegos_nuevos += 1
            else:
                juegos_viejos += 1
        
        horas_nuevos = 0
        horas_viejos = 0
        for g in first_play:
            horas = (sessions.filter(game_id=g['game_id']).aggregate(total=Sum('horas'))['total'] or 0)
            if g['first_date'].year == year:
                horas_nuevos += horas
            else:
                horas_viejos += horas

        # Top 3 Games
        top_games = (Library.objects.filter(id__in=juegos_ids).annotate(horas=Sum('play_sessions__horas',filter=Q(play_sessions__fecha__year=year))).order_by('-horas')[:3])
        top_games_data = []

        for game in top_games:
            logros_t = (AchievementProgress.objects.filter(game=game).aggregate(total=Sum('cantidad'))['total']or 0)
            top_games_data.append({
                "id": game.id,
                "nombre": game.nombre,
                "horas": float(game.horas),
                "imagen": request.build_absolute_uri(game.imagenP.url) if game.imagenP else None,
                "logros": logros_t
            })

        # Highlights
        logros_Year = (AchievementProgress.objects.filter(fecha__year=year).aggregate(total=Sum('cantidad'))['total']or 0)
        top_ach_game = (
            AchievementProgress.objects
            .filter(fecha__year=year)
            .values('game_id', 'game__nombre', 'game__imagenP')
            .annotate(total=Sum('cantidad'))
            .order_by('-total')
            .first()
        )
        
        juegos_terminados_year = Library.objects.filter(fecha_terminado__year=year)
        total_terminados = juegos_terminados_year.count()
        top_finished_game = (
            juegos_terminados_year
            .annotate(
                horas=Sum(
                    'play_sessions__horas',
                    filter=Q(play_sessions__fecha__year=year)
                )
            )
            .order_by('-horas')
            .first()
        )

        # Meses
        monthly_summary = []

        for month in range(1, 13):
            month_sessions = sessions.filter(fecha__month=month)

            horas = (month_sessions.aggregate(total=Sum('horas'))['total']or 0)

            monthly_summary.append({"month": month,"horas": float(horas)})

        return Response({
        "totals": {
            "jugados": total_juegos,
            "juegos": libreria,

            "precio": int(precio_total),
            "pro_precio": int(precio_total / juegos_precio) if juegos_precio else 0,

            "horas": float(total_horas),
            "tiempo": dias(total_horas),
            
            "almacenamiento": float(almacenamiento_total),
            "pro_alm": float(almacenamiento_total / total_juegos) if total_juegos else 0,

            "pro_horas_mes": round(promedio_horas_mes, 1),
            "pro_juegos_mes": round(promedio_juegos_mes, 1),
            
        },
        "distribucion": {
            "juegos": {
                "nuevos": juegos_nuevos,
                "viejos": juegos_viejos
            },
            "horas": {
                "nuevos": float(horas_nuevos),
                "viejos": float(horas_viejos)
            }
        },
        "top_games": top_games_data,
        "highlights": {
            "logros": {
                "cantidad": logros_Year,
                "top_game": {
                    "id": top_ach_game["game_id"] if top_ach_game else None,
                    "nombre": top_ach_game["game__nombre"] if top_ach_game else None,
                    "valor": top_ach_game["total"] if top_ach_game else 0,
                    "imagen": ( request.build_absolute_uri(f"/media/{top_ach_game['game__imagenP']}") if top_ach_game and top_ach_game.get("game__imagenP") else None)

                }
            },
            "terminados": {
                "cantidad": total_terminados,
                "top_game": {
                    "id": top_finished_game.id if top_finished_game else None,
                    "nombre": top_finished_game.nombre if top_finished_game else None,
                    "valor": float(top_finished_game.horas) if top_finished_game and top_finished_game.horas else 0,
                    "imagen": ( request.build_absolute_uri(top_finished_game.imagenP.url) if top_finished_game and top_finished_game.imagenP else None)
                }
            }
        },
        "meses":monthly_summary,
    })

    def month(self, request, year=None, month=None):
        sessions = PlaySession.objects.filter(fecha__year=year,fecha__month=month)
        total_horas = (PlaySession.objects.filter(fecha__year=year, fecha__month=month).aggregate(total=Sum('horas'))['total']or 0)
        total_logros = (AchievementProgress.objects.filter(fecha__year=year, fecha__month=month).aggregate(total=Sum('cantidad'))['total']or 0)

        juegos = (
            Library.objects
            .filter(play_sessions__in=sessions)
            .annotate(
                horas=Sum(
                    'play_sessions__horas',
                    filter=Q(
                        play_sessions__fecha__year=year,
                        play_sessions__fecha__month=month
                    )
                )
            )
            .distinct()
            .order_by('nombre')
        )

        data = []

        for game in juegos:
            logros = (
                AchievementProgress.objects
                .filter(
                    game=game,
                    fecha__year=year,
                    fecha__month=month
                )
                .aggregate(total=Sum('cantidad'))['total']
                or 0
            )

            data.append({
                "id": game.id,
                "nombre": game.nombre,
                "horas": float(game.horas),
                "logros": logros,
                "imagen": request.build_absolute_uri(game.imagenP.url) if game.imagenP else None
            })

        return Response({
            "horas": total_horas,
            "logros": total_logros,
            "games": data
        })
