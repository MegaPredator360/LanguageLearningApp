from rest_framework import serializers
from api.models.item import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'price', 'release_date', 'item_type', 'stock_quantity', 'id_user', 'id_item_tag']