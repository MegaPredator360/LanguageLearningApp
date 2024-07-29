from api.models.user import User
from api.serializers.user_serializer import UserSerializer
from api.services.utility_service import UtilityService

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

            # Verify that the email hasn't been registered already
            userFound = User.objects.filter(email = user['email']).exists()

            if userFound:
                
                # Raise an exception detailing that the email is registered
                raise ValueError(f'There is an account registered with the entered email')

            # Verify that the username hasn't been taken already
            userFound = User.objects.filter(username = user['username']).exists()

            if userFound:
                
                # Raise an exception detailing that the username has been taken
                raise ValueError(f'The entered username has been taken')

            # Assign the role to the user
            user['role'] = 3

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
                raise ValueError(errors)

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

    # Validar el login
    def login(self, login: dict):

        # Create the utility service object
        utilityService = UtilityService()

        try:
            # Encrypt password
            encriptedPassword = utilityService.encryptPassword(login['password'])

            # Retrieve the specific user
            userFound = User.objects.get(email = login['email'], password = encriptedPassword )

            # Create the JWT Token
            token = utilityService.createToken(userFound)

            # Return the token as a diccionary
            return {'jwt': token}

        # If the user to update doesn't exist
        except User.DoesNotExist:

                # Send an excepction
                raise ValueError('Email or password are not correct')

        # Any other posible exception
        except ValueError as e:

            # Send the exception
            raise e
