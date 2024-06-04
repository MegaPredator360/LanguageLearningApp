from django.db import models
from api.models.practice import Practice

class SentenceExercise(models.Model):
    pratice = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    sentence_complete = models.TextField()
    sentence_incomplete = models.TextField()
    missing_words = models.TextField()

    def __str__(self):
        return self.sentence_incomplete