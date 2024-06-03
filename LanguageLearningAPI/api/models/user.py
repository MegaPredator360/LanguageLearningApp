from django.db import models
from api.models.role import Role

class User(models.Model):
    full_name = models.CharField(max_length = 255)
    username = models.CharField(max_length = 255)

    # It validates that there is a unique email registered
    email = models.EmailField(unique = True)
    
    password = models.CharField(max_length = 255)
    birth_date = models.DateField()
    country = models.CharField(max_length = 20)
    active = models.BinaryField()
    role = models.ForeignKey(Role, on_delete = models.CASCADE, related_name = 'users')

    def __str__(self):
        return self.username
