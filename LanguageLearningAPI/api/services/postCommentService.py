from api.models.post_comments import PostComments
from api.serializers.postCommentsSerializer import PostCommentsSerializer

class PostCommentsService:

    # Obtain the list of all comments in the posts
    def list(self):

        try:

            # Obtain all comments in the posts
            postComments = PostComments.objects.all()

            # We serialize the objects
            serializer = PostCommentsSerializer(postComments, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new comment on a post
    def create(self, postComment: dict):

        try:

            # Serialize the data
            serializer = PostCommentsSerializer(data = postComment)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the post comment: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update a post comment
    def update(self, postComment: dict):

        try:

            # Retrieve the specific post comment
            postCommentFound = PostComments.objects.get(id = postComment['id'])

            # Update de data
            serializer = PostCommentsSerializer(instance = postCommentFound, data = postComment)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while updating the post comment: {errors}')

            return serializer.data

        # If the post comment to update doesn't exist
        except PostComments.DoesNotExist:

                # Send an excepction
                raise ValueError('The post comment to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a post comment
    def delete(self, postCommentId: int) -> bool:

        try:

            # Retrieve the specific post comment
            postCommentFound = PostComments.objects.get(id = postCommentId)

            # Delete the post comment
            postCommentFound.delete()

            return True

        # If the post comment to delete doesn't exist
        except PostComments.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The post comment to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e