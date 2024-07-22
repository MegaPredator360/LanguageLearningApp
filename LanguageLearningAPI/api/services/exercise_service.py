from api.models.exercise import Exercise
from api.serializers.exercise_serializer import ExerciseSerializer

class ExerciseService:

    # Obtain the list of all exercises
    def list(self):

        try:

            # Obtain all exercises
            exercises = Exercise.objects.all()

            # We serialize the objects
            serializer = ExerciseSerializer(exercises, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create an exercise
    def create(self, exercise: dict):

        try:

            # Serialize the data
            serializer = ExerciseSerializer(data = exercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the exercise: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update a exercise
    def update(self, exercise: dict):

        try:

            # Retrieve the specific exercise
            exerciseFound = Exercise.objects.get(id = exercise['id'])

            # Update de data
            serializer = ExerciseSerializer(instance = exerciseFound, data = exercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the exercise: {errors}')

            return serializer.data

        # If the exercise to update doesn't exist
        except Exercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a exercise
    def delete(self, exerciseId: int) -> bool:

        try:

            # Retrieve the specific exercise
            exerciseFound = Exercise.objects.get(id = exerciseId)

            # Delete the exercise
            exerciseFound.delete()

            return True

        # If the exercise to delete doesn't exist
        except Exercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The exercise to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e