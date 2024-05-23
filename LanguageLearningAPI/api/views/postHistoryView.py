from django.shortcuts import render
from rest_framework import generics
from api.models.post_history import PostHistory
from api.serializers.postHistorySerializer import PostHistorySerializer

# Obtain the list of edits / updates made to a post
class PostHistoryList(generics.ListAPIView):

    # SQL Query
    queryset = PostHistory.objects.all()

    # Serializer
    serializer_class = PostHistorySerializer

# Add an edit / update to a post
class PostHistoryCreate(generics.CreateAPIView):

    # Serializer
    serializer_class = PostHistorySerializer