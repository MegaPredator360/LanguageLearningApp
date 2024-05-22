from rest_framework import serializers
from api.models.post_history import PostHistory

class PostHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PostHistory
        fields = ['id', 'id_post', 'edit_comment', 'edit_date', 'edit_body', 'id_user']