from rest_framework import serializers
from api.models.item_tag import ItemTag

class ItemTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemTag
        fields = ['id', 'tag_name']