from django.shortcuts import render
from rest_framework import viewsets
from tasks.models import Task
from tasks.serializers import TaskSerializer
# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
