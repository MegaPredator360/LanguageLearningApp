from django.db import models
from api.models.post import Post
from api.models.user import User

class PostHistory(models.Model):

    # Id of the post that was edited / updated
    id_post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name = 'ph_posts')

    # Id of the user who edited / updated the post
    id_user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'ph_users')

    # Comment on what was edited / updated
    edit_comment = models.CharField(max_length = 255)
    edit_date = models.DateField(auto_now_add = True)

    # Content of the edited / updated post
    edit_body = models.TextField()

    def __str__(self):
        return self.id_post