from django.db import models
from api.models.user import User
from api.models.lecture import Lecture

class LectureReview(models.Model):
    lecture = models.ForeignKey(Lecture, on_delete = models.CASCADE, related_name = 'lr_lectures')
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'lr_users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.FloatField()

    def __str__(self):
        return self.comment