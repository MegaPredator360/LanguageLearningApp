from rest_framework import serializers
from LanguageLearningAPI.api.models.exercise import Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'publish_date', 'user', 'language', 'category']