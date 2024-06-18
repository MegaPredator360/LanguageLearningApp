from django.db import models
from api.models.language import Language
from api.models.topic import Topic
from api.models.user import User

class Practice(models.Model):
    name = models.CharField(max_length = 255)
    description = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'practice_users')
    language = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'practice_languages')
    topic = models.ManyToManyField(Topic, related_name = 'practice_topics')


    def __str__(self):
        return self.name
