from rest_framework import serializers
from api.models.exercise_resource import ExerciseResource

class ExerciseResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseResource
        fields = ['id', 'exercise', 'exercise_number', 'description', 'media_type', 'media_location']