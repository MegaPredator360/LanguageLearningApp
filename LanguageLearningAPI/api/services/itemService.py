from api.serializers.itemSerializer import ItemSerializer
from api.models.item import Item

class ItemService:

    # Obtain the list of all items
    def list(self):

        try:

            # Obtain all items
            items = Item.objects.all()

            # We serialize the objects
            serializer = ItemSerializer(items, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new item
    def create(self, item: dict):

        try:

            # Serialize the data
            serializer = ItemSerializer(data = item)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the item: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an item
    def update(self, item: dict):

        try:

            # Retrieve the specific item
            itemFound = Item.objects.get(id = item['id'])

            # Update de data
            serializer = ItemSerializer(instance = itemFound, data = item)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the item: {errors}')

            return serializer.data

        # If the item to update doesn't exist
        except Item.DoesNotExist:

                # Send an excepction
                raise ValueError('The item to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete an item
    def delete(self, itemId: int) -> bool:

        try:

            # Retrieve the specific item
            itemFound = Item.objects.get(id = itemId)

            # Delete the item
            itemFound.delete()

            return True

        # If the item to delete doesn't exist
        except Item.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The item to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e