from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
# Each view is used in urls.py, where the url determines which view is done
# The view only works for get when accessed from urls.py
# The frontend framework is needed to access the other actions

# We are using function based views, so the following line 
# is needed to use Django REST Framework functionality
@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls) 
	#Response from server is a JSON object for APIs

@api_view(['GET'])
def taskList(request):
	tasks = Task.objects.all().order_by('-id')
	#Orders the tasks in the list by id in descending order
	serializer = TaskSerializer(tasks, many=True)
	#Returns many tasks as a list
	return Response(serializer.data)
	#Returns each task ordered by id

@api_view(['GET'])
def taskDetail(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(task, many=False)
	return Response(serializer.data)
	#Returns one specific task using the serializer given an id


@api_view(['POST'])
def taskCreate(request):
	serializer = TaskSerializer(data=request.data.data)
	# It takes the data and returns a JSON object given 
	# the request data which is a Task
	if serializer.is_valid():
		#We use the is_valid() method to make sure there are no errors
		serializer.save()
		#If valid, we send it back to the database and save it


	return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data.data)
	# Given the instance, the serializer 
	# replaces it with the request data which is a Task
	if serializer.is_valid():
		#We use the is_valid() method to make sure there are no errors
		serializer.save()
		#If valid, we send it back to the database and save it

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Task.objects.get(id=pk)
	task.delete()
	#From the model we find the object with the given id and delete it.
	return Response('Item successfully delete!')



