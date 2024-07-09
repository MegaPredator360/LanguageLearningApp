from api.models.reading import Reading
from api.serializers.reading_serializer import ReadingSerializer

class ReadingService:

    # Obtain the list of all readings
    def list(self):

        try:

            # Obtain all readings
            readings = Reading.objects.all()

            # We serialize the objects
            serializer = ReadingSerializer(readings, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new reading
    def create(self, reading: dict):

        try:

            # Serialize the data
            serializer = ReadingSerializer(data = reading)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the reading: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete a reading
    def delete(self, readingId: int) -> bool:

        try:

            # Retrieve the specific reading
            readingFound = Reading.objects.get(id = readingId)

            # Delete the reading
            readingFound.delete()

            return True

        # If the reading to delete doesn't exist
        except Reading.DoesNotExist:

                # Send an excepction
                raise ValueError('The reading to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e