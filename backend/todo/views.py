from django.shortcuts import render
from rest_framework import viewsets
from .models import Todolist
from .serializers import TodoSerializer
# Create your views here.


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todolist.objects.all()
    serializer_class = TodoSerializer