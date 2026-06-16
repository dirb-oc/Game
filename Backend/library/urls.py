from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'generos', GenresViewSet)
router.register(r'libreria', LibraryViewSet)
router.register(r'deseados', WishViewSet)
router.register(r'sesiones', PlaySessionViewSet)
router.register(r'logros', AchievementProgressViewSet)
router.register(r'stats', StatsViewSet, basename='stats')
router.register(r'equipo', DeviceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/<int:year>/<int:month>/',StatsViewSet.as_view({'get': 'month'}))
]
