from api.models.reading_tag import ReadingTag
from api.serializers.reading_tag_serializer import ReadingTagSerializer

class ReadingTagService:

    # Obtain the list of all reading tags
    def list(self):

        try:

            # Obtain all reading tags
            readingTags = ReadingTag.objects.all()

            # We serialize the objects
            serializer = ReadingTagSerializer(readingTags, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e
        
    # Create a reading tag
    def create(self, readingTag: dict):

        try:

            # Serialize the data
            serializer = ReadingTagSerializer(data = readingTag)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the reading tag: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete a reading tag
    def delete(self, readingTagId: int) -> bool:

        try:

            # Retrieve the specific reading tag
            readingTagFound = ReadingTag.objects.get(id = readingTagId)

            # Delete the reading tag
            readingTagFound.delete()

            return True

        # If the reading tag to delete doesn't exist
        except ReadingTag.DoesNotExist:

                # Send an excepction
                raise ValueError('The reading tag to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e