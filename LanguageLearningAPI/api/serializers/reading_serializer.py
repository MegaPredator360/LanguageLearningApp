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

    # Runs when creating a new reading
    def create(self, validated_data):

        # Obtain data of tags
        tags_data = validated_data.pop('reading_tags')
        reading = Reading.objects.create(**validated_data)

        # Loop for each tag
        for tag in tags_data:

            # Add tag
            ReadingTag.objects.create(reading = reading, **tag)

        return reading

    # Runs when updating a reading
    def update(self, instance, validated_data):

        # Extracts the tags from the request
        tags_data = validated_data.pop('reading_tags', [])

        # Update the data from the reading
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.body = validated_data.get('body', instance.body)
        instance.views = validated_data.get('views', instance.views)
        instance.language = validated_data.get('language', instance.language)
        instance.category = validated_data.get('category', instance.category)

        # The changes are saved
        instance.save()

        # Obtaint the tags associated to the reading from the database
        db_tags = {tag.name for tag in instance.reading_tags.all()}

        # Obtain the tags from the request
        request_tags = {tag_data['name'] for tag_data in tags_data}

        # Identifies the tags to eliminate and create
        tags_delete = db_tags - request_tags
        tags_create = request_tags - db_tags

        # It deletes the tags that are not present
        instance.reading_tags.filter(name__in = tags_delete).delete()

        # Creates and associates the new tags
        for tag_name in tags_create:
            new_tag, created = ReadingTag.objects.get_or_create(name = tag_name)
            instance.reading_tags.add(new_tag)

        '''
        # Maintain existing tags and update them if necessary
        for tag_data in tags_data:
            existing_tag = instance.reading_tags.filter(name = tag_data['name']).first()
            if existing_tag:
                existing_tag.name = tag_data.get('name', existing_tag.name)
                existing_tag.save()
        '''

        return instance