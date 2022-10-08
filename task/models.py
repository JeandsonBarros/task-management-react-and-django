from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    description = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    taskDate = models.DateTimeField(auto_now_add=False)
    creationDate = models.DateTimeField(auto_now_add=True, editable=False)
    taskCompleted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)