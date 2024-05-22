from django.shortcuts import render
from rest_framework import generics
from api.models.user import User
from api.serializers.userSerializer import UserSerializer

# Obtain user list
class UserList(generics.ListAPIView):

    # SQL Query
    queryset = User.objects.all()

    # Serializer
    serializer_class = UserSerializer

# Create users
class UserCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = UserSerializer

# Update users
class UserUpdate(generics.UpdateAPIView):

    # SQL Query
    queryset = User.objects.all()

    # Serializer
    serializer_class = UserSerializer

    # Primary Key of table
    lookup_field = 'pk'

# Delete users
class UserDelete(generics.DestroyAPIView):

    # SQL Query
    queryset = User.objects.all()

    # Serializer
    serializer_class = UserSerializer

    # Primary Key of table
    lookup_field = 'pk'