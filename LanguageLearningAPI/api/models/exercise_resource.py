from django.db import models
from api.models.exercise import Exercise

class ExerciseResource(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'resource_exercise')
    exercise_number = models.IntegerField()
    description = models.TextField()
    media_type = models.CharField(max_length = 255)
    media_location = models.CharField(max_length = 255)

    def __str__(self):
        return self.description
