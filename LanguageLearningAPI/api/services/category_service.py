from api.models.category import Category
from api.serializers.category_serializer import CategorySerializer

class CategoryService:

    # Obtain the list of all categories
    def list(self):

        try:

            # Obtain all categories
            categories = Category.objects.all()

            # We serialize the objects
            serializer = CategorySerializer(categories, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new item
    def create(self, category: dict):

        try:

            # Serialize the data
            serializer = CategorySerializer(data = category)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the category: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e