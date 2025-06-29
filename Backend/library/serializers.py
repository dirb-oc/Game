from rest_framework import serializers
from .models import *

class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = ['id', 'genero']

class LibrarySerializer(serializers.ModelSerializer):
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
            'id', 'nombre', 'lanzamiento', 'precio', 'almacenamiento',
            'tiempo', 'logros_Cantidad', 'logros_Completados', 'terminado',
            'J_genero', 'generos_ids', 'imagen', 'imagenP', 'descripcion'
        ]

class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = '__all__'
