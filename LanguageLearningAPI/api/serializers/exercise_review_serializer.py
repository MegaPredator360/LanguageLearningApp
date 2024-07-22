from rest_framework import serializers
from api.models.exercise_review import ExerciseReview

class ExerciseReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseReview
        fields = ['id', 'exercise', 'user', 'comment', 'publish_date', 'user_rate']