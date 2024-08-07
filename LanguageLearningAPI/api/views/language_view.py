from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.dtos.responseAPI import ResponseAPI
from api.services.language_service import LanguageService

class LanguageView:

    @api_view(['GET'])
    def list(request):

        # Declare the service to use
        languageService = LanguageService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = languageService.list()

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
        languageService = LanguageService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = languageService.create(request.data)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)