from django.db import models

# Create your models here.
# Every model has an id field which is unique
class Task(models.Model):
  todo = models.CharField(max_length=200)
  name = models.CharField(max_length=200)
      
  def __str__(self):
    return self.todo 
    # Used for debugging, returns the 
    # model's todo message when converted to a string