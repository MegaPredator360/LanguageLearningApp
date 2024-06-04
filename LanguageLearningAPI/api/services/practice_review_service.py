from api.models.practice_review import PracticeReview
from api.serializers.practice_review_serializer import PracticeReviewSerializer


class PracticeReviewService:

    # Obtain the list of all the reviews
    def list(self):

        try:

            # Obtain all the reviews
            practiceReviews = PracticeReview.objects.all()

            # We serialize the objects
            serializer = PracticeReviewSerializer(practiceReviews, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new review
    def create(self, practiceReview: dict):

        try:

            # Serialize the data
            serializer = PracticeReviewSerializer(data = practiceReview)

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
    def update(self, practiceReview: dict):

        try:

            # Retrieve the specific review
            practiceReviewFound = PracticeReview.objects.get(id = practiceReview['id'])

            # Update de data
            serializer = PracticeReviewSerializer(instance = practiceReviewFound, data = practiceReview)

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
        except PracticeReview.DoesNotExist:

                # Send an excepction
                raise ValueError('The review to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a review
    def delete(self, practiceReviewId: int) -> bool:

        try:

            # Retrieve the specific review
            practiceReviewFound = PracticeReview.objects.get(id = practiceReviewId)

            # Delete the review
            practiceReviewFound.delete()

            return True

        # If the review to delete doesn't exist
        except PracticeReview.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The review to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e