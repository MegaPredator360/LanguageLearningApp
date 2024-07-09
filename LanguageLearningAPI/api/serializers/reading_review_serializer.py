from rest_framework import serializers
from api.models.reading_review import ReadingReview

class ReadingReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingReview
        fields = ['id', 'reading', 'user', 'comment', 'publish_date', 'user_rate']