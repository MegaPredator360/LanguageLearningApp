from api.serializers.itemTagSerializer import ItemTagSerializer
from api.models.item_tag import ItemTag

class ItemTagService:

    # Obtain the list of all items tags
    def list(self):

        try:

            # Obtain all items tags
            itemTags = ItemTag.objects.all()

            # We serialize the objects
            serializer = ItemTagSerializer(itemTags, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new item
    def create(self, itemTag: dict):

        try:

            # Serialize the data
            serializer = ItemTagSerializer(data = itemTag)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the item tag: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e