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
    tiempo = models.DecimalField(max_digits=5, decimal_places=1)
    logros_Cantidad = models.DecimalField( max_digits=5, decimal_places=2, null=True, blank=True)
    logros_Completados = models.DecimalField( max_digits=5, decimal_places=2, null=True, blank=True)
    J_genero = models.ManyToManyField(Genres, related_name='Generos') 
    imagen = models.URLField(max_length=300, null=True, blank=True)
    imagenP = models.URLField(max_length=300, null=True, blank=True, default="https://www.esportmaniacos.com/wp-content/uploads/2021/10/si-min.jpg")
    descripcion = models.CharField(max_length=500, default="Nada")
    terminado = models.BooleanField(default=False)

class Wish(Game):
    r_opciones = [
        ('Minimo', 'Minimo'),
        ('Medio', 'Medio'),
        ('Alto', 'Alto')
    ]
    minimo = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    requisitos = models.CharField(choices=r_opciones, max_length=50, null=True, blank=True)