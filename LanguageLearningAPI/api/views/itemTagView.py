from django.shortcuts import render
from rest_framework import generics
from api.models.item_tag import ItemTag
from api.serializers.itemTagSerializer import ItemTagSerializer

# Obtain the list of available tags for item to sell
class ItemTagList(generics.ListAPIView):

    # SQL Query
    queryset = ItemTag.objects.all()

    # Serializer
    serializer_class = ItemTagSerializer

# Add a support to a new Language
class ItemTagCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = ItemTagSerializer