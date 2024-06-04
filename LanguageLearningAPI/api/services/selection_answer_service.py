from api.models.selection_answer import SelectionAnswer
from api.serializers.selection_answer_serializer import SelectionAnswerSerializer

class SelectionAnswerService:

    # Obtain the list of all selection answer
    def list(self):

        try:

            # Obtain all selection answer
            selectionAnswers = SelectionAnswer.objects.all()

            # We serialize the objects
            serializer = SelectionAnswerSerializer(selectionAnswers, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a selection answer
    def create(self, selectionAnswer: dict):

        try:

            # Serialize the data
            serializer = SelectionAnswerSerializer(data = selectionAnswer)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the selection answer: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Delete a selection answer
    def delete(self, selectionAnswerId: int) -> bool:

        try:

            # Retrieve the specific selection answer
            selectionAnswerFound = SelectionAnswer.objects.get(id = selectionAnswerId)

            # Delete the selection answer
            selectionAnswerFound.delete()

            return True

        # If the selection answer to delete doesn't exist
        except SelectionAnswer.DoesNotExist:

                # Send an excepction
                raise ValueError('The selection answer to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e