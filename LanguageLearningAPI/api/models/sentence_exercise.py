from django.db import models
from LanguageLearningAPI.api.models.exercise import Exercise

class SentenceExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'sentence_exercises')
    exercise_number = models.IntegerField()
    sentence_complete = models.TextField()
    sentence_incomplete = models.TextField()
    missing_words = models.TextField()

    def __str__(self):
        return self.sentence_incomplete