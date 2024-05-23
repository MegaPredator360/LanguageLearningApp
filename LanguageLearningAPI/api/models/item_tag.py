from django.db import models

class ItemTag(models.Model):
    tag_name = models.CharField(max_length = 20)

    def __str__(self):
        return self.tag_name