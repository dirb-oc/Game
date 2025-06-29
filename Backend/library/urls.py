from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'generos', GenresViewSet)
router.register(r'libreria', LibraryViewSet)
router.register(r'deseados', WishViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
