from django.db import models
from api.models.topic import Topic
from api.models.user import User
from api.models.language import Language

class Lecture(models.Model):
    title = models.CharField(max_length = 255)
    lecture_body = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'lecture_users')
    language = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'lecture_languages')
    topic = models.ManyToManyField(Topic, related_name = 'lecture_topics')

    def __str__(self):
        return self.title