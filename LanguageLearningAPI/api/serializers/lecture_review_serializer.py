from rest_framework import serializers
from api.models.lecture_review import LectureReview

class LectureReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureReview
        fields = ['id', 'lecture', 'user', 'comment', 'publish_date', 'user_rate']