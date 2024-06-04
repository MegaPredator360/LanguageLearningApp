from api.models.practice import Practice
from api.serializers.practice_serializer import PracticeSerializer

class PracticeService:

    # Obtain the list of all practices
    def list(self):

        try:

            # Obtain all practices
            practices = Practice.objects.all()

            # We serialize the objects
            serializer = PracticeSerializer(practices, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a practice
    def create(self, practice: dict):

        try:

            # Serialize the data
            serializer = PracticeSerializer(data = practice)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the practice: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update a practice
    def update(self, practice: dict):

        try:

            # Retrieve the specific practice
            practiceFound = Practice.objects.get(id = practice['id'])

            # Update de data
            serializer = PracticeSerializer(instance = practiceFound, data = practice)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the practice: {errors}')

            return serializer.data

        # If the practice to update doesn't exist
        except Practice.DoesNotExist:

                # Send an excepction
                raise ValueError('The practice exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a practice
    def delete(self, practiceId: int) -> bool:

        try:

            # Retrieve the specific practice
            practiceFound = Practice.objects.get(id = practiceId)

            # Delete the practice
            practiceFound.delete()

            return True

        # If the practice to delete doesn't exist
        except Practice.DoesNotExist:

                # Send an excepction
                raise ValueError('The practice to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e