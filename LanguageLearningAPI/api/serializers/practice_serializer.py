from rest_framework import serializers
from api.models.practice import Practice

class PracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = ['id', 'name', 'description', 'publish_date', 'user', 'language', 'topic']