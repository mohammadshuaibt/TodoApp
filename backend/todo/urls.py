from rest_framework import routers
from .views import TodoViewSet


router = routers.DefaultRouter()
router.register('todo',TodoViewSet, basename='todo')

urlpatterns =[] + router.urls