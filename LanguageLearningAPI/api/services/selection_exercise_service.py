from api.models.selection_exercise import SelectionExercise
from api.serializers.selection_exercise_serializer import SelectionExerciseSerializer

class SelectionExerciseService:

    # Obtain the list of all selection exercises
    def list(self):

        try:

            # Obtain all selection exercise
            selectionExercises = SelectionExercise.objects.all()

            # We serialize the objects
            serializer = SelectionExerciseSerializer(selectionExercises, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a selection exercise
    def create(self, selectionExercise: dict):

        try:

            # Serialize the data
            serializer = SelectionExerciseSerializer(data = selectionExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the selection exercise: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an selection exercise
    def update(self, selectionExercise: dict):

        try:

            # Retrieve the specific selection exercise
            selectionExerciseFound = SelectionExercise.objects.get(id = selectionExercise['id'])

            # Update de data
            serializer = SelectionExerciseSerializer(instance = selectionExerciseFound, data = selectionExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the selection exercise: {errors}')

            return serializer.data

        # If the selection exercise to update doesn't exist
        except SelectionExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The selection exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a selection exercise
    def delete(self, selectionExerciseId: int) -> bool:

        try:

            # Retrieve the specific selection exercise
            selectionExerciseFound = SelectionExercise.objects.get(id = selectionExerciseId)

            # Delete the selection exercise
            selectionExerciseFound.delete()

            return True

        # If the selection exercise to delete doesn't exist
        except SelectionExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The selection exercise to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e