from django.db import models
from api.models.practice import Practice

class TrueFalseExercise(models.Model):
    practice = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    question = models.TextField()
    answer = models.BinaryField()

    def __str__(self):
        return self.question
