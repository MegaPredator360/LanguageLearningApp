from api.models.user import User
from api.serializers.userSerializer import UserSerializer
from api.services.utilityService import UtilityService

class UserService:

    # Obtain the list of all users
    def list(self):

        try:

            # Obtain all users
            users = User.objects.all()

            # We serialize the objects
            serializer = UserSerializer(users, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Create a new user
    def create(self, user: dict):

        # Create the utility service object
        utilityService = UtilityService()

        try:

            # Encrypt the password
            user['password'] = utilityService.encryptPassword(user['password'])

            # Serialize the data
            serializer = UserSerializer(data = user)

            # If the data matches with what is expected
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the user: {errors}')

            # Return a response
            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e

    # Update an user
    def update(self, user: dict):

        try:

            # Retrieve the specific user
            userFound = User.objects.get(id = user['id'])

            # Update de data
            serializer = UserSerializer(instance = userFound, data = user)

            # If the data is valid
            if serializer.is_valid():

                # Save the new data into the database
                serializer.save()

            else:
                # Get the serializer errors
                errors = serializer.errors

                # Raise an exception with detailed error information
                raise ValueError(f'Errors occurred while saving the user: {errors}')

            return serializer.data

        # If the user to update doesn't exist
        except User.DoesNotExist:

                # Send an excepction
                raise ValueError('The user to update does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e

    # Delete an user
    def delete(self, userId: int) -> bool:

        try:

            # Retrieve the specific user
            userFound = User.objects.get(id = userId)

            # Delete the user
            userFound.delete()

            return True

        # If the user to delete doesn't exist
        except User.DoesNotExist:
                
                # Send an excepction
                raise ValueError('The user to delete does not exist')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e
