from api.serializers.postHistorySerializer import PostHistorySerializer
from api.models.post_history import PostHistory

class PostHistoryService:

    # Obtain the list of all history of posts
    def list(self):

        try:

            # Obtain all history of posts
            postHistories = PostHistory.objects.all()

            # We serialize the objects
            serializer = PostHistorySerializer(postHistories, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new post update
    def create(self, postHistory: dict):

        try:

            # Serialize the data
            serializer = PostHistorySerializer(data = postHistory)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the update to the post: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e