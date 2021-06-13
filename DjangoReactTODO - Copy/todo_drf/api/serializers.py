from rest_framework import serializers
from .models import Task

#Serializers convert models to JSON
class TaskSerializer(serializers.ModelSerializer):
	class Meta:
		model = Task #Returns the task model
		fields ='__all__' #Returns all fields in the task