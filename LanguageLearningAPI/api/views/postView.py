from django.shortcuts import render
from rest_framework import generics
from api.models.post import Post
from api.serializers.postSerializer import PostSerializer

# Obtain list of posts
class PostList(generics.ListAPIView):

    # SQL Query
    queryset = Post.objects.all()

    # Serializer
    serializer_class = PostSerializer

# Create posts
class PostCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = PostSerializer

# Delete posts
class PostDelete(generics.DestroyAPIView):

    # SQL Query
    queryset = Post.objects.all()

    # Serializer
    serializer_class = PostSerializer

    # Primary Key of table
    lookup_field = 'pk'