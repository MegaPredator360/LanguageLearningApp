from django.db import models
from LanguageLearningAPI.api.models.practice import Practice

class Sentence_Exercise(models.Model):
    pratice_id = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    exercise_number = models.IntegerField()
    sentence_complete = models.TextField()
    sentence_incomplete = models.TextField()
    missing_words = models.TextField()

    def __str__(self):
        return self.sentence_incomplete