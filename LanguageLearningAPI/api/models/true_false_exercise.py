from django.db import models
from api.models.exercise import Exercise

class TrueFalseExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'tf_exercises')
    exercise_number = models.IntegerField()
    question = models.TextField()
    answer = models.BinaryField()

    def __str__(self):
        return self.question
