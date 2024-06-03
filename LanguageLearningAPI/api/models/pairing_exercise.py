from django.db import models
from api.models.practice import Practice

class PairingExercise(models.Model):
    practice_id = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    description = models.TextField()
    column_a = models.TextField()
    column_b = models.TextField()
    association = models.CharField(max_length = 255)


    def __str__(self):
        return self.description
