from django.db import models

class User(models.Model):
    full_name = models.CharField(max_length = 255)
    username = models.CharField(max_length = 255)
    email = models.EmailField(unique = True)
    password = models.CharField(max_length = 255)
    birth_date = models.DateField()
    country = models.CharField(max_length = 20)
    id_role = models.IntegerField()
    #profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.username
