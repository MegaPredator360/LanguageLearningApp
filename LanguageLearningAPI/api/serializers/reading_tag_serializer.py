from rest_framework import serializers
from api.models.reading_tag import ReadingTag

class ReadingTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingTag
        fields = ['id', 'name']