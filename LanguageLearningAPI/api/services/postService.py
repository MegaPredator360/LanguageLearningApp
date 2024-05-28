from api.models.post import Post
from api.serializers.postSerializer import PostSerializer

class PostService:

    # Obtain the list of all posts
    def list(self):

        try:

            # Obtain all posts
            posts = Post.objects.all()

            # We serialize the objects
            serializer = PostSerializer(posts, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new post
    def create(self, post: dict):

        try:

            # Serialize the data
            serializer = PostSerializer(data = post)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the post: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete a post
    def delete(self, postId: int) -> bool:

        try:

            # Retrieve the specific post
            postFound = Post.objects.get(id = postId)

            # Delete the post
            postFound.delete()

            return True

        # If the post to delete doesn't exist
        except Post.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The post to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e