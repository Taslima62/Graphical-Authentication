from django.db import models
from django.db.models.fields import EmailField

from django.utils import timezone
import math
class GetDateTime(object):
     
    def whenpublished(self):
        now = timezone.now()
        
        diff= now - self.time
        if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 300:
            return "true"
                
        return "false"

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100, blank=False, unique=True)
    password = models.CharField(max_length=400, blank=False)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=111, default="")
    
    def __str__(self):
        return self.username

class Images(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True)
    status = models.EmailField(max_length=111, default="")

class LoginTry(models.Model,GetDateTime):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, blank=False)
    time = models.DateTimeField(auto_now_add= True)
    status = models.BooleanField (default=True)


class LoginError(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, blank=False)
    time = models.DateTimeField(auto_now_add= True)

class SuccessRate(models.Model,GetDateTime):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, blank=False)
    time = models.DateTimeField(auto_now_add= True)
    status = models.BooleanField (default=True)