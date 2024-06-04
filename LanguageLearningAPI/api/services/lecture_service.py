from api.models.lecture import Lecture
from api.serializers.lecture_serializer import LectureSerializer

class LectureService:

    # Obtain the list of all lectures
    def list(self):

        try:

            # Obtain all lectures
            lectures = Lecture.objects.all()

            # We serialize the objects
            serializer = LectureSerializer(lectures, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new lecture
    def create(self, lecture: dict):

        try:

            # Serialize the data
            serializer = LectureSerializer(data = lecture)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the lecture: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete a lecture
    def delete(self, lectureId: int) -> bool:

        try:

            # Retrieve the specific lecture
            lectureFound = Lecture.objects.get(id = lectureId)

            # Delete the lecture
            lectureFound.delete()

            return True

        # If the lecture to delete doesn't exist
        except Lecture.DoesNotExist:

                # Send an excepction
                raise ValueError('The lecture to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e