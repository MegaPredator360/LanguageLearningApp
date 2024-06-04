from rest_framework import serializers
from api.models.selection_exercise import SelectionExercise

class SelectionExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelectionExercise
        fields = ['id', 'practice', 'exercise_number', 'question', 'option_a', 'option_b', 'option_c', 'option_d']