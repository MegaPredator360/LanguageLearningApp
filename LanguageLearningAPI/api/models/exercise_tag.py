from django.db import models
from api.models.exercise import Exercise

class ExerciseTag(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'exercise_tags')
    name = models.CharField(max_length = 20)

    def __str__(self):
        return self.name