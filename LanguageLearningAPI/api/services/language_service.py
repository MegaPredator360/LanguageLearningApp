from api.serializers.language_serializer import LanguageSerializer
from api.models.language import Language

class LanguageService:

    # Obtain the list of all languages
    def list(self):

        try:

            # Obtain all languages
            languages = Language.objects.all()

            # We serialize the objects
            serializer = LanguageSerializer(languages, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new item
    def create(self, language: dict):

        try:

            # Serialize the data
            serializer = LanguageSerializer(data = language)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the language: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e