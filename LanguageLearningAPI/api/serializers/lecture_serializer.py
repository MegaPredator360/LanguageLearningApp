from rest_framework import serializers
from api.models.lecture import Lecture

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['id', 'title', 'lecture_body', 'publish_date', 'user', 'language', 'topic']