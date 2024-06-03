from django.db import models
from api.models.practice import Practice

class SelectionExercise(models.Model):
    practice_id = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    question = models.CharField(max_length=255)
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)

    def __str__(self):
        return self.question
