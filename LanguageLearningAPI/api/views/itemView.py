from django.shortcuts import render
from rest_framework import generics
from api.models.item import Item
from api.serializers.itemSerializer import ItemSerializer

# Obtain items list
class ItemList(generics.ListAPIView):

    # SQL Query
    queryset = Item.objects.all()

    # Serializer
    serializer_class = ItemSerializer

# Create items
class ItemCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = ItemSerializer

# Update item
class ItemUpdate(generics.UpdateAPIView):

    # SQL Query
    queryset = Item.objects.all()

    # Serializer
    serializer_class = ItemSerializer

    # Primary Key of table
    lookup_field = 'pk'

# Delete items
class ItemDelete(generics.DestroyAPIView):

    # SQL Query
    queryset = Item.objects.all()

    # Serializer
    serializer_class = ItemSerializer

    # Primary Key of table
    lookup_field = 'pk'