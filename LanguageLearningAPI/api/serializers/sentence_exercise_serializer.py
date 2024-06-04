from rest_framework import serializers
from api.models.sentence_exercise import Sentence_Exercise

class PracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence_Exercise
        fields = ['id', 'practice', 'exercise_number', 'sentence_complete', 'sentence_incomplete', 'missing_words']