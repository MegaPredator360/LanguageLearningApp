from django.db import models
from api.models.language import Language
from api.models.category import Category
from api.models.user import User

class Exercise(models.Model):
    name = models.CharField(max_length = 255)
    description = models.TextField()
    publish_date = models.DateTimeField(auto_now_add = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'exercise_users')
    language = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'exercise_languages')
    category = models.ManyToManyField(Category, related_name = 'exercise_topics')


    def __str__(self):
        return self.name
