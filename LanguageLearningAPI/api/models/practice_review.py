from django.db import models
from api.models.practice import Practice
from api.models.user import User

class PracticeReview(models.Model):
    practice_id = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'practices')
    user_id = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.FloatField()

    def __str__(self):
        return self.name
