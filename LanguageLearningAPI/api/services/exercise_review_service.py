from api.models.exercise_review import ExerciseReview
from api.serializers.exercise_review_serializer import ExerciseReviewSerializer


class ExerciseReviewService:

    # Obtain the list of all the reviews
    def list(self):

        try:

            # Obtain all the reviews
            exerciseReviews = ExerciseReview.objects.all()

            # We serialize the objects
            serializer = ExerciseReviewSerializer(exerciseReviews, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new review
    def create(self, exerciseReview: dict):

        try:

            # Serialize the data
            serializer = ExerciseReviewSerializer(data = exerciseReview)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the review: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update a review
    def update(self, exerciseReview: dict):

        try:

            # Retrieve the specific review
            exerciseReviewFound = ExerciseReview.objects.get(id = exerciseReview['id'])

            # Update de data
            serializer = ExerciseReviewSerializer(instance = exerciseReviewFound, data = exerciseReview)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while updating the review: {errors}')

            return serializer.data

        # If the review to update doesn't exist
        except ExerciseReview.DoesNotExist:

                # Send an excepction
                raise ValueError('The review to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a review
    def delete(self, exerciseReviewId: int) -> bool:

        try:

            # Retrieve the specific review
            exerciseReviewFound = ExerciseReview.objects.get(id = exerciseReviewId)

            # Delete the review
            exerciseReviewFound.delete()

            return True

        # If the review to delete doesn't exist
        except ExerciseReview.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The review to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e