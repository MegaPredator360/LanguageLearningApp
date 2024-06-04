from rest_framework import serializers
from api.models.true_false_exercise import TrueFalseExercises

class TrueFalseExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalseExercises
        fields = ['id', 'practice', 'exercise_number', 'question', 'answer']