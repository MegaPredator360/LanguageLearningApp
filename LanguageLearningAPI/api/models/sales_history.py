from django.db import models

class SalesHistory(models.Model):

    # Item that was purchased
    id_item = models.IntegerField()

    # User who purchased the item
    id_user = models.IntegerField()
    sale_date = models.DateTimeField()
    quantity = models.IntegerField()

    def __str__(self):
        return self.tag_name