from api.serializers.salesHistorySerializer import SalesHistorySerializer
from api.models.sales_history import SalesHistory


class SalesHistoryService:

    # Obtain the list of the history of all sales made
    def list(self):

        try:

            # Obtain all sales made
            salesHistories = SalesHistory.objects.all()

            # We serialize the objects
            serializer = SalesHistorySerializer(salesHistories, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new sale
    def create(self, salesHistory: dict):

        try:

            # Serialize the data
            serializer = SalesHistorySerializer(data = salesHistory)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the sale: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e