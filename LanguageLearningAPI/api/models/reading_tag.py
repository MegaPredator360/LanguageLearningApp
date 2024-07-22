from django.db import models
from api.models.reading import Reading

class ReadingTag(models.Model):
    reading = models.ForeignKey(Reading, on_delete = models.CASCADE, related_name = 'reading_tags')
    name = models.CharField(max_length = 20)

    def __str__(self):
        return self.name