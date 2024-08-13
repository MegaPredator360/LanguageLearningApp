from rest_framework import serializers
from api.models.reading import Reading
from api.models.reading_tag import ReadingTag
from api.serializers.reading_tag_serializer import ReadingTagSerializer
from api.serializers.reading_review_serializer import ReadingReviewSerializer

class ReadingSerializer(serializers.ModelSerializer):

    # Other fields
    user_username = serializers.CharField(source = 'user.username', read_only = True)
    language_name = serializers.CharField(source = 'language.name', read_only = True)
    category_name = serializers.CharField(source = 'category.name', read_only = True)
    reading_tags = ReadingTagSerializer(many = True)

    class Meta:
        model = Reading
        fields = [
            'id', 
            'title', 
            'description', 
            'body', 
            'publish_date', 
            'likes', 
            'dislikes', 
            'views', 
            'user', 
            'user_username', 
            'language', 
            'language_name', 
            'category', 
            'category_name',
            'reading_tags',
            ]

    def create(self, validated_data):

        # Obtain data of tags
        tags_data = validated_data.pop('reading_tags')
        reading = Reading.objects.create(**validated_data)

        # Loop for each tag
        for tag in tags_data:

            # Add tag
            ReadingTag.objects.create(reading = reading, **tag)

        return reading

    def update(self, instance, validated_data):
        etiquetas_data = validated_data.pop('etiquetas')
        etiquetas = (instance.etiquetas).all()
        etiquetas = list(etiquetas)
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.contenido = validated_data.get('contenido', instance.contenido)
        instance.save()

        for etiqueta_data in etiquetas_data:
            etiqueta = etiquetas.pop(0)
            etiqueta.nombre = etiqueta_data.get('nombre', etiqueta.nombre)
            etiqueta.save()
        return instance