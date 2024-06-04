from api.models.true_false_exercise import TrueFalseExercise
from api.serializers.true_false_exercise_serializer import TrueFalseExerciseSerializer

class TrueFalseExerciseService:

    # Obtain the list of all true / false exercises
    def list(self):

        try:

            # Obtain all true / false exercise
            trueFalseExercises = TrueFalseExercise.objects.all()

            # We serialize the objects
            serializer = TrueFalseExerciseSerializer(trueFalseExercises, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a true / false exercise
    def create(self, trueFalseExercise: dict):

        try:

            # Serialize the data
            serializer = TrueFalseExerciseSerializer(data = trueFalseExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the true / false exercise: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an true / false exercise
    def update(self, trueFalseExercise: dict):

        try:

            # Retrieve the specific true / false exercise
            trueFalseExerciseFound = TrueFalseExercise.objects.get(id = trueFalseExercise['id'])

            # Update de data
            serializer = TrueFalseExerciseSerializer(instance = trueFalseExerciseFound, data = trueFalseExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the true / false exercise: {errors}')

            return serializer.data

        # If the true / false exercise to update doesn't exist
        except TrueFalseExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The true / false exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a true / false exercise
    def delete(self, trueFalseExerciseId: int) -> bool:

        try:

            # Retrieve the specific true / false exercise
            trueFalseExerciseFound = TrueFalseExercise.objects.get(id = trueFalseExerciseId)

            # Delete the true / false exercise
            trueFalseExerciseFound.delete()

            return True

        # If the true / false exercise to delete doesn't exist
        except TrueFalseExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The true / false exercise to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e