from rest_framework import serializers
from LanguageLearningAPI.api.models.category import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']