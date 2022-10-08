
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from rest_framework.exceptions import NotFound

from task.models import Task
from task.serializers import TaskSerializer

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

name = openapi.Parameter('name', openapi.IN_QUERY, description="task name param", type=openapi.TYPE_STRING)
date = openapi.Parameter('date', openapi.IN_QUERY, description="task date param", type=openapi.TYPE_STRING)

class TaskListAndCreateView(APIView, LimitOffsetPagination):

    @swagger_auto_schema(
        manual_parameters=[name, date],
        responses={200: TaskSerializer(many=True)},
        operation_description="All user taks",)  
    def get(self, request):
        
        tasks = Task.objects.filter(user=request.user).order_by('taskDate')

        name = request.query_params.get('name')
        if name is not None:
            tasks = Task.objects.filter(name__contains=name, user=request.user).order_by('taskDate')

        taskDate = request.query_params.get('date')
        if taskDate is not None:
            tasks = Task.objects.filter(taskDate__contains=taskDate, user=request.user).order_by('taskDate')

        results = self.paginate_queryset(tasks, request, view=self)
        tasksSerializer = TaskSerializer(results, many=True)

        return self.get_paginated_response(tasksSerializer.data)

    @swagger_auto_schema(
        request_body=TaskSerializer,
        operation_description="Save taks")
    def post(self, request):
        taskSerializer = TaskSerializer(data=request.data)

        if taskSerializer.is_valid():
            task = Task.objects.create(
                name=taskSerializer.data['name'],
                description=taskSerializer.data['description'],
                taskDate=taskSerializer.data['taskDate'],
                user=request.user         
            )

            task.save()
            return Response(taskSerializer.data, status=status.HTTP_201_CREATED)
        return Response(taskSerializer.erros, status=status.HTTP_400_BAD_REQUEST)

class TaskRetrieverUpdateAndDelete(APIView, LimitOffsetPagination):
    def get_object(self, user, pk):
        try:
            return Task.objects.get(pk=pk, user=user)
        except Task.DoesNotExist:
            raise NotFound()
    
    @swagger_auto_schema(
        responses={200: TaskSerializer(many=False)},
        operation_description="One task",)
    def get(self, request, pk):
        task = self.get_object(request.user, pk)
        taskSerializer = TaskSerializer(task)

        return Response(taskSerializer.data)

    
    @swagger_auto_schema(
        request_body=TaskSerializer,
        operation_description="Update taks")
    def put(self, request, pk):

        task = self.get_object(request.user, pk)

        taskSerializer = TaskSerializer(instance=task, data=request.data)

        if taskSerializer.is_valid():    
            taskSerializer.save()
            return Response(taskSerializer.data, status=status.HTTP_201_CREATED)
        return Response(taskSerializer.erros, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        response=204,
        operation_description="Delete task")
    def delete(self, request, pk):
        task = self.get_object(request.user, pk)
        task.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
