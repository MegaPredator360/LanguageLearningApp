from django.db import models
from api.models.practice import Practice
from api.models.user import User

class PracticeReview(models.Model):
    practice = models.ForeignKey(Practice, on_delete = models.CASCADE, related_name = 'pr_practices')
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'pr_users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.FloatField()

    def __str__(self):
        return self.comment
