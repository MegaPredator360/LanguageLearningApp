from django.db import models
from LanguageLearningAPI.api.models.exercise import Exercise

class PairingExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'pairing_exercises')
    exercise_number = models.IntegerField()
    description = models.TextField()
    column_a = models.TextField()
    column_b = models.TextField()
    association = models.CharField(max_length = 255)


    def __str__(self):
        return self.description
