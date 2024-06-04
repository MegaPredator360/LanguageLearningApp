from rest_framework import serializers
from api.models.selection_answer import SelectionAnswer

class SelectionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelectionAnswer
        fields = ['id', 'selection', 'answer']