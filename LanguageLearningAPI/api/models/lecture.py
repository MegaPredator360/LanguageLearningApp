from django.db import models
from api.models.user import User
from api.models.language import Language

class Lecture(models.Model):
    title = models.CharField(max_length = 255)
    lecture_body = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'users')
    language_id = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'languages')

    def __str__(self):
        return self.title