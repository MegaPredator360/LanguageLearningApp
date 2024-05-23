from django.shortcuts import render
from rest_framework import generics
from api.models.post_comments import PostComments
from api.serializers.postCommentsSerializer import PostCommentsSerializer

# Obtain a list of all comments made
class PostCommentsList(generics.ListAPIView):

    # SQL Query
    queryset = PostComments.objects.all()

    # Serializer
    serializer_class = PostCommentsSerializer

# Create comments on a post
class PostCommentsCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = PostCommentsSerializer

# Update comments of a post
class PostCommentsUpdate(generics.UpdateAPIView):

    # SQL Query
    queryset = PostComments.objects.all()

    # Serializer
    serializer_class = PostCommentsSerializer

    # Primary Key of table
    lookup_field = 'pk'

# Delete comment from a post
class PostCommentsDelete(generics.DestroyAPIView):

    # SQL Query
    queryset = PostComments.objects.all()

    # Serializer
    serializer_class = PostCommentsSerializer

    # Primary Key of table
    lookup_field = 'pk'