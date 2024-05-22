from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    price = models.FloatField()
    release_date = models.DateField()

    # Either Physical or Digital
    item_type = models.CharField(max_length=7)

    # Only applies for physical items
    stock_quantity = models.IntegerField()
    id_user = models.IntegerField()
    id_item_tag = models.IntegerField()

    def __str__(self):
        return self.name