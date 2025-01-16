from rest_framework import routers
from .views import TodoViewSet
from django.urls import path


router = routers.DefaultRouter()
router.register(r'todo',TodoViewSet, basename='todo')

urlpatterns =[] + router.urls