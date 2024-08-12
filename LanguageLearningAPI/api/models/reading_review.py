from django.db import models
from api.models.user import User
from api.models.reading import Reading

class ReadingReview(models.Model):
    reading = models.ForeignKey(Reading, on_delete = models.CASCADE, related_name = 'rr_readings')
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'rr_users')
    comment = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_rate = models.IntegerField()

    def __str__(self):
        return self.comment