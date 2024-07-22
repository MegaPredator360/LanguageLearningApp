from rest_framework import serializers
from api.models.reading import Reading

class ReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = ['id', 'title', 'reading_body', 'publish_date', 'user', 'language', 'category']