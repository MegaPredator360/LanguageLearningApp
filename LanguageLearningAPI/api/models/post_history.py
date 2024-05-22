from django.db import models

class PostHistory(models.Model):

    # Id of the post that was edited / updated
    id_post = models.IntegerField()

    # Comment on what was edited / updated
    edit_comment = models.CharField(max_length=255)
    edit_date = models.DateField()

    # Content of the edited / updated post
    edit_body = models.TextField()

    # Id of the user who edited / updated the post
    id_user = models.IntegerField()

    def __str__(self):
        return self.id_post