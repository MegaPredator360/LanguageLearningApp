from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.dtos.responseAPI import ResponseAPI
from api.services.user_service import UserService

class UserView:

    @api_view(['GET'])
    def list(request):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = userService.list()

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)

    @api_view(['POST'])
    def create(request):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = userService.create(request.data)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)

    @api_view(['PUT'])
    def update(request):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Get the token from the cookies
            token = request.COOKIES.get('jwt')

            # Return the data
            response.value = userService.update(request.data, token)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)

    @api_view(['DELETE'])
    def delete(request):

        # Declare the service to use
        userService = UserService()
        responseAPI = ResponseAPI()
        response = Response()

        try:

            # Set the status of the request a success
            responseAPI.status = True

            # Get the token from the cookies
            token = request.COOKIES.get('jwt')

            # Return the data
            responseAPI.value = userService.delete(token)

            # Delete the cookies that contains the token
            response.delete_cookie('jwt')

            # Message of the response
            responseAPI.msg = "Account delete successfully"

        except ValueError as e:

            # Set the status of the request as failed
            responseAPI.status = False

            # Send the message of why it failed
            responseAPI.msg = str(e)

        # Assign the data of the response
        response.data = responseAPI.__dict__

        # Status of the response
        response.status_code = 200

        # Return the response
        return response

    @api_view(['POST'])
    def login(request):

        # Declare the service to use
        userService = UserService()
        responseAPI = ResponseAPI()
        response = Response()

        try:

            # Set the status of the request a success
            responseAPI.status = True

            # Return the token
            token = userService.login(request.data)

            # Save the token in the cookies of the browser
            response.set_cookie(key = 'jwt', value = token, httponly = True, samesite = 'None', secure = True)

            # Send the token as part of the response
            responseAPI.value = { 'jwt': token }

        except ValueError as e:

            # Set the status of the request as failed
            responseAPI.status = False

            # Send the message of why it failed
            responseAPI.msg = str(e)

        # Assign the data of the response
        response.data = responseAPI.__dict__

        # Status of the response
        response.status_code = 200

        # Return the response
        return response

    @api_view(['GET'])
    def logged(request):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Get the token from the cookies
            token = request.COOKIES.get('jwt')

            # Get the user that is logged in
            response.value = userService.loggedUser(token)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)

    @api_view(['POST'])
    def logout(request):

        # Declare the service to use
        responseAPI = ResponseAPI()
        response = Response()

        try:

            # Set the status of the request a success
            responseAPI.status = True

            # Delete the cookies that contains the token
            response.delete_cookie('jwt')

            responseAPI.msg = "Logged out successfully"

        except ValueError as e:

            # Set the status of the request as failed
            responseAPI.status = False

            # Send the message of why it failed
            responseAPI.msg = str(e)

        # Assign the data of the response
        response.data = responseAPI.__dict__

        # Status of the response
        response.status_code = 200

        # Return the response
        return response