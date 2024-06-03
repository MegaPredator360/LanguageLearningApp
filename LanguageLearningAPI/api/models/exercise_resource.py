from django.db import models
from api.models.practice import Practice

class ExerciseResource(models.Model):
    practice = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    description = models.TextField()
    media_type= models.CharField(max_length = 255)
    media_location = models.CharField(max_length = 255)

    def __str__(self):
        return self.description
