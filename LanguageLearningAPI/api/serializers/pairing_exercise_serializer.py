from rest_framework import serializers
from api.models.pairing_exercise import PairingExercise

class PairingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PairingExercise
        fields = ['id', 'practice', 'exercise_number', 'description', 'column_a', 'column_b', 'association']