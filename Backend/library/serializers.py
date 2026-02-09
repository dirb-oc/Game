from decimal import Decimal, ROUND_HALF_UP
from library.services.Days import dias
from rest_framework import serializers
from django.db.models import Sum
from .models import *

class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = ['id', 'genero']

class LibraryListSerializer(serializers.ModelSerializer):
    total_horas = serializers.SerializerMethodField()
    J_genero = GenresSerializer(many=True, read_only=True)

    generos_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genres.objects.all(),
        many=True,
        write_only=True,
        source='J_genero'
    )

    class Meta:
        model = Library
        fields = [
            'id', 'nombre', 'precio', 'lanzamiento',
            'fecha_terminado', 'J_genero', 'generos_ids', 
            'total_horas', 'imagen', 'almacenamiento',
        ]

    def get_total_horas(self, obj):
        return obj.total_horas if hasattr(obj, 'total_horas') else (
            obj.play_sessions.aggregate(total=Sum('horas'))['total'] or 0
        )

class LibraryDetailSerializer(serializers.ModelSerializer):
    J_genero = GenresSerializer(many=True, read_only=True)

    generos_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genres.objects.all(),
        many=True,
        write_only=True,
        source='J_genero'
    )

    total_horas = serializers.SerializerMethodField()
    horas_en_dias = serializers.SerializerMethodField()
    valor_hora = serializers.SerializerMethodField()
    logros_completados = serializers.SerializerMethodField()
    porcentaje_logros = serializers.SerializerMethodField()

    class Meta:
        model = Library
        fields = [
            'id', 'nombre', 'lanzamiento', 
            'precio', 'almacenamiento',
            'total_horas', 'horas_en_dias',
            'valor_hora', 'logros_Cantidad',
            'logros_completados', 'porcentaje_logros',
            'fecha_terminado', 'J_genero',
            'generos_ids', 'imagenP', 
             'imagen', 'descripcion',
        ]

    def get_total_horas(self, obj):
        return obj.play_sessions.aggregate(
            total=Sum('horas')
        )['total'] or Decimal('0')


    def get_horas_en_dias(self, obj):
        total_horas = self.get_total_horas(obj)
        return dias(total_horas)


    def get_valor_hora(self, obj):
        total_horas = self.get_total_horas(obj)

        if not obj.precio or total_horas == 0:
            return None

        return int(
            (Decimal(obj.precio) / Decimal(total_horas)).quantize(
                Decimal('1'),rounding=ROUND_HALF_UP
            )
        )

    def get_logros_completados(self, obj):
        return obj.achievement_progress.aggregate(
            total=Sum('cantidad')
        )['total'] or 0
    
    def get_porcentaje_logros(self, obj):
        logrosC = self.get_logros_completados(obj)
        if not obj.logros_Cantidad:
            return 0
        
        return round((logrosC / obj.logros_Cantidad) * 100, 2)

class PlaySessionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaySession
        fields = ['id', 'game', 'horas', 'fecha']

class PlaySessionCreateSerializer(serializers.Serializer):
    game = serializers.PrimaryKeyRelatedField(queryset=Library.objects.all())
    total_horas = serializers.DecimalField(max_digits=5, decimal_places=1)

    def create(self, validated_data):
        game = validated_data['game']
        total_reportado = validated_data['total_horas']

        total_actual = game.play_sessions.aggregate(
            total=Sum('horas')
        )['total'] or Decimal('0')

        incremento = total_reportado - total_actual

        if incremento <= 0:
            raise serializers.ValidationError(
                "El total de horas no puede ser menor o igual al actual"
            )

        return PlaySession.objects.create(game=game,horas=incremento)

class AchievementProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementProgress
        fields = ['id', 'game', 'cantidad', 'fecha']

class AchievementProgressReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementProgress
        fields = ['id', 'game', 'cantidad', 'fecha']

class AchievementProgressCreateSerializer(serializers.Serializer):
    game = serializers.PrimaryKeyRelatedField(queryset=Library.objects.all())
    
    total_logros = serializers.IntegerField(min_value=0)

    def validate(self, attrs):
        game = attrs['game']
        total_reportado = attrs['total_logros']

        # 1️⃣ El juego no tiene logros
        if not game.logros_Cantidad or game.logros_Cantidad <= 0:
            raise serializers.ValidationError(
                "Este juego no tiene logros configurados"
            )

        # 2️⃣ No puede superar el máximo
        if total_reportado > game.logros_Cantidad:
            raise serializers.ValidationError(
                f"El máximo de logros es {game.logros_Cantidad}"
            )

        total_actual = game.achievement_progress.aggregate(
            total=Sum('cantidad')
        )['total'] or 0

        incremento = total_reportado - total_actual

        # 3️⃣ No hay cambios
        if incremento == 0:
            raise serializers.ValidationError(
                "El total de logros no ha cambiado"
            )

        # 4️⃣ El total final debe quedar en rango
        nuevo_total = total_actual + incremento
        if not (0 <= nuevo_total <= game.logros_Cantidad):
            raise serializers.ValidationError(
                "La corrección deja el total fuera de rango"
            )

        attrs['incremento'] = incremento
        return attrs

    def create(self, validated_data):
        return AchievementProgress.objects.create(
            game=validated_data['game'],
            cantidad=validated_data['incremento']
        )

class WishSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Wish
        fields = '__all__'