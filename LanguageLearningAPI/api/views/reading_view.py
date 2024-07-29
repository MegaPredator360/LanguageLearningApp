from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.dtos.responseAPI import ResponseAPI
from api.services.reading_service import ReadingService

class ReadingView:

    @api_view(['GET'])
    def list(request):

        # Declare the service to use
        readingService = ReadingService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingService.list()

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
        readingService = ReadingService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Get the cookie of the user who is logged in
            token = request.COOKIES.get('jwt')

            # Check if the user is logged in
            if not token:
                raise ValueError("The user is not logged in")

            # Return the data
            response.value = readingService.create(request.data, token)

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
        readingService = ReadingService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingService.delete(id)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)