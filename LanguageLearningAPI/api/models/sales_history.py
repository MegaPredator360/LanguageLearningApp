from django.db import models
from api.models.item import Item
from api.models.user import User

class SalesHistory(models.Model):

    # Item that was purchased
    id_item = models.ForeignKey(Item, on_delete = models.CASCADE, related_name = 'sale_items')

    # User who purchased the item
    id_user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'sale_users')
    sale_date = models.DateTimeField(auto_now_add = True)
    quantity = models.IntegerField()

    def __str__(self):
        return self.tag_name