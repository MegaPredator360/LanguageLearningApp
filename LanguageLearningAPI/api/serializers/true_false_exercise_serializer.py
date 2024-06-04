from rest_framework import serializers
from api.models.true_false_exercise import TrueFalseExercise

class TrueFalseExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalseExercise
        fields = ['id', 'practice', 'exercise_number', 'question', 'answer']