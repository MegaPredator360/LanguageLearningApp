from django.db import models
from django.contrib.auth.models import AbstractUser
from api.models.role import Role

class User(AbstractUser):
    full_name = models.CharField(max_length = 255)
    email = models.CharField(max_length = 255, unique = True)
    birth_date = models.DateField()
    country = models.CharField(max_length = 20)
    active = models.BooleanField(default = True)
    role = models.ForeignKey(Role, on_delete = models.CASCADE, related_name = 'user_role')

    # Fields to be ignored
    first_name = None
    last_name = None
    is_active = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
