from rest_framework import serializers
from api.models.practice_review import PracticeReview

class PracticeReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeReview
        fields = ['id', 'practice', 'user', 'comment', 'publish_date', 'user_rate']