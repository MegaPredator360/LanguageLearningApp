from rest_framework import serializers
from api.models.post_comments import PostComments

class PostCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComments
        fields = ['id', 'id_post', 'id_user', 'comment_body', 'comment_date', 'post_rate']