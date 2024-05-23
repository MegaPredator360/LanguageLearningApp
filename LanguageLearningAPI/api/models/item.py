from django.db import models
from api.models.user import User
from api.models.item_tag import ItemTag

class Item(models.Model):
    name = models.CharField(max_length = 100)
    description = models.CharField(max_length = 255)
    price = models.FloatField()
    release_date = models.DateField()

    # Either Physical or Digital
    item_type = models.CharField(max_length = 7)

    # Only applies for physical items
    stock_quantity = models.IntegerField()
    id_user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'items_users')
    id_item_tag = models.ManyToManyField(ItemTag, related_name = 'items_tags')

    def __str__(self):
        return self.name