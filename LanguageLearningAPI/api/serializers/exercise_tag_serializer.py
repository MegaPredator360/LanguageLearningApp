from rest_framework import serializers
from LanguageLearningAPI.api.models.exercise_tag import ExerciseTag

class ExerciseTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseTag
        fields = ['id', 'exercise', 'name']