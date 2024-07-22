from django.db import models
from api.models.category import Category
from api.models.user import User
from api.models.language import Language

class Reading(models.Model):
    title = models.CharField(max_length = 255)
    reading_body = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'reading_users')
    language = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'reading_languages')
    category = models.ForeignKey(Category, related_name = 'reading_topics')

    def __str__(self):
        return self.title