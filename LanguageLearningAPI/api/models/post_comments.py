from django.db import models

class PostComments(models.Model):
    id_post = models.IntegerField()
    id_user = models.IntegerField()
    comment_body = models.TextField()
    comment_date = models.DateField()
    post_rate = models.IntegerField()

    def __str__(self):
        return self.comment_date