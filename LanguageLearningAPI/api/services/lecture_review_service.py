from api.models.lecture_review import LectureReview
from api.serializers.lecture_review_serializer import LectureReviewSerializer

class LectureReviewService:

    # Obtain the list of all the reviews
    def list(self):

        try:

            # Obtain all the reviews
            lectureReviews = LectureReview.objects.all()

            # We serialize the objects
            serializer = LectureReviewSerializer(lectureReviews, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new review
    def create(self, lectureReview: dict):

        try:

            # Serialize the data
            serializer = LectureReviewSerializer(data = lectureReview)

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
    def update(self, lectureReview: dict):

        try:

            # Retrieve the specific lecture review
            lectureReviewFound = LectureReview.objects.get(id = lectureReview['id'])

            # Update de data
            serializer = LectureReviewSerializer(instance = lectureReviewFound, data = lectureReview)

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
        except LectureReview.DoesNotExist:

                # Send an excepction
                raise ValueError('The review to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a review
    def delete(self, lectureReviewId: int) -> bool:

        try:

            # Retrieve the specific review
            lectureReviewFound = LectureReview.objects.get(id = lectureReviewId)

            # Delete the review
            lectureReviewFound.delete()

            return True

        # If the review to delete doesn't exist
        except LectureReview.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The review to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e