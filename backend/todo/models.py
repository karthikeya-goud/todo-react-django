from django.db import models

# Create your models here.

class Todo(models.Model):

    title:str=models.CharField(max_length=100)
    description:str=models.TextField()
    deadline=models.DateField()
    completed:bool=models.BooleanField()
