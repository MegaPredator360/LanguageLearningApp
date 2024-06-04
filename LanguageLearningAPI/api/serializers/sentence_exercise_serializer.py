from rest_framework import serializers
from api.models.sentence_exercise import SentenceExercise

class SentenceExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentenceExercise
        fields = ['id', 'practice', 'exercise_number', 'sentence_complete', 'sentence_incomplete', 'missing_words']