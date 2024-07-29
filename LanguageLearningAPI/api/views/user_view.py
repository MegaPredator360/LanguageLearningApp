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

            # Return the data
            response.value = userService.update(request.data)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)

    @api_view(['DELETE'])
    def delete(request, id: int):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = userService.delete(id)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)
    

    
    @api_view(['POST'])
    def login(request):

        # Declare the service to use
        userService = UserService()
        response = ResponseAPI()
        responseJWT = Response()

        try:

            print(request.data)

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = userService.verifyLogin(request.data)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        responseJWT.set_cookie(key = 'jwt', value = response.value['jwt'], httponly = True)
        responseJWT.data = response.__dict__
        responseJWT.status_code = 200

        # Return the response
        return responseJWT