from django.db import models

class Language(models.Model):
    language_name = models.CharField(max_length=20)

    def __str__(self):
        return self.language_name