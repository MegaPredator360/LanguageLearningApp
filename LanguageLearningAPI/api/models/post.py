from django.db import models
from api.models.user import User
from api.models.language import Language

class Post(models.Model):
    title = models.CharField(max_length = 255)
    body_post = models.TextField()
    post_date = models.DateField(auto_now_add = True)
    id_user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'post_users')
    id_language = models.ForeignKey(Language, on_delete = models.CASCADE, related_name = 'post_languages')

    def __str__(self):
        return self.title