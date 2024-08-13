from rest_framework import serializers
from api.models.reading_review import ReadingReview

class ReadingReviewSerializer(serializers.ModelSerializer):

    # Other Fields
    user_username = serializers.CharField(source = 'user.username', read_only = True)

    class Meta:
        model = ReadingReview
        fields = ['id', 'reading', 'user', 'user_username', 'comment', 'publish_date', 'user_rate']