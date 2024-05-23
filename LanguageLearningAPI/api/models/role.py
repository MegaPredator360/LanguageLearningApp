from django.db import models
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class Role(models.Model):
    role_name = models.CharField(max_length = 20)

    def __str__(self):
        return self.role_name
