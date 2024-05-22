from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    body_post = models.TextField()
    post_date = models.DateField()
    id_user = models.IntegerField()
    id_language = models.IntegerField()

    def __str__(self):
        return self.title