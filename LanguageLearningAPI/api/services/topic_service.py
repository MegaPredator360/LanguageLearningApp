from api.models.topic import Topic
from api.serializers.topic_serializer import TopicSerializer

class TopicService:

    # Obtain the list of all topics
    def list(self):

        try:

            # Obtain all topics
            topics = Topic.objects.all()

            # We serialize the objects
            serializer = TopicSerializer(topics, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new item
    def create(self, topic: dict):

        try:

            # Serialize the data
            serializer = TopicSerializer(data = topic)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the topic: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e