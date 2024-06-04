from django.db import models
from api.models.selection_exercise import SelectionExercise

class SelectionAnswer(models.Model):
    selection = models.ForeignKey(SelectionExercise, on_delete = models.CASCADE, related_name = 'selections')
    answer = models.IntegerField()

    def __str__(self):
        return self.answer
