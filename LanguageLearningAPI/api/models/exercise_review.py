from django.db import models
from LanguageLearningAPI.api.models.exercise import Exercise
from api.models.user import User

class ExerciseReview(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete = models.CASCADE, related_name = 'er_practices')
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'er_users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.FloatField()

    def __str__(self):
        return self.comment
