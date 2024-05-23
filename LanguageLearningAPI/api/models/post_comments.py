from django.db import models
from api.models.user import User
from api.models.post import Post

class PostComments(models.Model):
    id_post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name = 'pc_posts')
    id_user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'pc_users')
    comment_body = models.TextField()
    comment_date = models.DateField()
    post_rate = models.FloatField()

    def __str__(self):
        return self.comment_date