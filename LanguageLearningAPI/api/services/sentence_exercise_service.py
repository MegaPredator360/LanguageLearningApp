from api.models.sentence_exercise import SentenceExercise
from api.serializers.sentence_exercise_serializer import SentenceExerciseSerializer

class SentenceExerciseService:

    # Obtain the list of all sentence exercises
    def list(self):

        try:

            # Obtain all sentence exercise
            sentenceExercises = SentenceExercise.objects.all()

            # We serialize the objects
            serializer = SentenceExerciseSerializer(sentenceExercises, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a sentence exercise
    def create(self, sentenceExercise: dict):

        try:

            # Serialize the data
            serializer = SentenceExerciseSerializer(data = sentenceExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the sentence exercise: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an sentence exercise
    def update(self, sentenceExercise: dict):

        try:

            # Retrieve the specific sentence exercise
            sentenceExerciseFound = SentenceExercise.objects.get(id = sentenceExercise['id'])

            # Update de data
            serializer = SentenceExerciseSerializer(instance = sentenceExerciseFound, data = sentenceExercise)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the sentence exercise: {errors}')

            return serializer.data

        # If the sentence exercise to update doesn't exist
        except SentenceExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The sentence exercise to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a sentence exercise
    def delete(self, sentenceExerciseId: int) -> bool:

        try:

            # Retrieve the specific sentence exercise
            sentenceExerciseFound = SentenceExercise.objects.get(id = sentenceExerciseId)

            # Delete the sentence exercise
            sentenceExerciseFound.delete()

            return True

        # If the sentence exercise to delete doesn't exist
        except SentenceExercise.DoesNotExist:

                # Send an excepction
                raise ValueError('The sentence exercise to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e