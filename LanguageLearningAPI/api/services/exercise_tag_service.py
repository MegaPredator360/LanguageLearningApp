from api.models.exercise_tag import ExerciseTag
from api.serializers.exercise_tag_serializer import ExerciseTagSerializer

class ExerciseTagService:

    # Obtain the list of all exercise tags
    def list(self):

        try:

            # Obtain all exercises
            exerciseTags = ExerciseTag.objects.all()

            # We serialize the objects
            serializer = ExerciseTagSerializer(exerciseTags, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e
        
    # Create an exercise tag
    def create(self, exerciseTag: dict):

        try:

            # Serialize the data
            serializer = ExerciseTagSerializer(data = exerciseTag)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the exercise tag: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete an exercise tag
    def delete(self, exerciseTagId: int) -> bool:

        try:

            # Retrieve the specific exercise
            exerciseTagFound = ExerciseTag.objects.get(id = exerciseTagId)

            # Delete the exercise
            exerciseTagFound.delete()

            return True

        # If the exercise to delete doesn't exist
        except ExerciseTag.DoesNotExist:

                # Send an excepction
                raise ValueError('The exercise tag to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e