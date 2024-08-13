from api.services.utility_service import UtilityService
from api.models.reading_review import ReadingReview
from api.serializers.reading_review_serializer import ReadingReviewSerializer

class ReadingReviewService:

    # Obtain the list of all the reviews
    def list(self):

        try:

            # Obtain all the reviews
            readingReviews = ReadingReview.objects.all()

            # We serialize the objects
            serializer = ReadingReviewSerializer(readingReviews, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new review
    def create(self, readingReview: dict):

        utilityService = UtilityService()

        try:

            # Verify the user that is creating the reading
            userId = utilityService.getUserToken(readingReview['jwt'])

            # Assign the user Id to the foreign key
            readingReview['user'] = userId

            # Serialize the data
            serializer = ReadingReviewSerializer(data = readingReview)

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
    def update(self, readingReview: dict):

        try:

            # Retrieve the specific reading review
            readingReviewFound = ReadingReview.objects.get(id = readingReview['id'])

            # Update de data
            serializer = ReadingReviewSerializer(instance = readingReviewFound, data = readingReview)

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
        except ReadingReview.DoesNotExist:

                # Send an excepction
                raise ValueError('The review to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete a review
    def delete(self, readingReviewId: int) -> bool:

        try:

            # Retrieve the specific review
            readingReviewFound = ReadingReview.objects.get(id = readingReviewId)

            # Delete the review
            readingReviewFound.delete()

            return True

        # If the review to delete doesn't exist
        except ReadingReview.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The review to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e