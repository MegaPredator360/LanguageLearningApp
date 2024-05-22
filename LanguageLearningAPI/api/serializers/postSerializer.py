from rest_framework import serializers
from api.models.post import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'body_post', 'post_date', 'id_user', 'id_language']