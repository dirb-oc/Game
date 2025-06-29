from rest_framework import viewsets
from .models import *
from .serializers import *

class GenresViewSet(viewsets.ModelViewSet):
    queryset = Genres.objects.all()
    serializer_class = GenresSerializer

class LibraryViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer

class WishViewSet(viewsets.ModelViewSet):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer