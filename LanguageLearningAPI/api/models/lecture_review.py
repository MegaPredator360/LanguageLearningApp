from django.db import models
from api.models.user import User
from LanguageLearningAPI.api.models.lecture import Lecture

class LectureReview(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete = models.CASCADE, related_name = 'lectures')
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.FloatField()

    def __str__(self):
        return self.comment