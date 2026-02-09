from django.db import models

class Genres(models.Model):
    genero = models.CharField(max_length=50)

class Game(models.Model):
    nombre = models.CharField(max_length=50)
    lanzamiento = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    precio = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    almacenamiento = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)

    class Meta:
        abstract = True

class Library(Game):
    logros_Cantidad = models.PositiveIntegerField(null=True, blank=True)
    J_genero = models.ManyToManyField(Genres, related_name='generos')
    imagen_Url = models.URLField(max_length=1000, null=True, blank=True)
    imagenP_Url = models.URLField(
        max_length=1000,
        null=True,
        blank=True,
        default="https://www.esportmaniacos.com/wp-content/uploads/2021/10/si-min.jpg"
    )
    descripcion = models.CharField(max_length=500, default="Nada")
    fecha_terminado = models.DateField(null=True, blank=True)

    imagen = models.ImageField(upload_to="library/banners/", null=True, blank=True)
    imagenP = models.ImageField(upload_to="library/covers/", null=True, blank=True)


class PlaySession(models.Model):
    game = models.ForeignKey(
        Library,
        on_delete=models.CASCADE,
        related_name='play_sessions'
    )
    horas = models.DecimalField(max_digits=4, decimal_places=1)
    fecha = models.DateField(auto_now_add=True)

class AchievementProgress(models.Model):
    game = models.ForeignKey(
        Library,
        on_delete=models.CASCADE,
        related_name='achievement_progress'
    )
    cantidad = models.PositiveIntegerField()
    fecha = models.DateField(auto_now_add=True)

class Wish(Game):
    r_opciones = [
        ('Minimo', 'Minimo'),
        ('Medio', 'Medio'),
        ('Alto', 'Alto')
    ]
    minimo = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    requisitos = models.CharField(choices=r_opciones, max_length=50, null=True, blank=True),