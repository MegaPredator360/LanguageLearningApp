from api.serializers.pairing_exercise_serializer import PairingExerciseSerializer
from api.models.pairing_exercise import PairingExercise

class PairingExerciseService:

    # Obtain the list of all pairing exercises
    def list(self):

        try:

            # Obtain all pairing exercise
            pairingExercises = PairingExercise.objects.all()

            # We serialize the objects
            serializer = PairingExerciseSerializer(pairingExercises, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a pairing exercise
    def create(self, pairingExercise: dict):

        try:

            # Serialize the data
            serializer = PairingExerciseSerializer(data = pairingExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the pairing exercise: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an pairing exercise
    def update(self, pairingExercise: dict):

        try:

            # Retrieve the specific pairing exercise
            pairingExerciseFound = PairingExercise.objects.get(id = pairingExercise['id'])

            # Update de data
            serializer = PairingExerciseSerializer(instance = pairingExerciseFound, data = pairingExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the pairing exercise: {errors}')

            return serializer.data

        # If the pairing exercise to update doesn't exist
        except PairingExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The pairing exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a pairing exercise
    def delete(self, pairingExerciseId: int) -> bool:

        try:

            # Retrieve the specific pairing exercise
            pairingExerciseFound = PairingExercise.objects.get(id = pairingExerciseId)

            # Delete the pairing exercise
            pairingExerciseFound.delete()

            return True

        # If the pairing exercise to delete doesn't exist
        except PairingExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The pairing exercise to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e