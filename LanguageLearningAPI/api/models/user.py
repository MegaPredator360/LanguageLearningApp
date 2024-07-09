from django.db import models
from api.models.role import Role

class User(models.Model):
    full_name = models.CharField(max_length = 255)
    username = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)
    birth_date = models.DateField()
    country = models.CharField(max_length = 20)
    active = models.BooleanField()
    role = models.ForeignKey(Role, on_delete = models.CASCADE, related_name = 'user_role')

    def __str__(self):
        return self.username
