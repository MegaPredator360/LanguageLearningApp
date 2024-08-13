from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.dtos.responseAPI import ResponseAPI
from api.services.reading_review_service import ReadingReviewService

class ReadingReviewView:

    @api_view(['GET'])
    def list(request, id: int):

        # Declare the service to use
        readingReviewService = ReadingReviewService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingReviewService.list(id)

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
        readingReviewService = ReadingReviewService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingReviewService.create(request.data)

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
        readingReviewService = ReadingReviewService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingReviewService.update(request.data)

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
        readingReviewService = ReadingReviewService()
        response = ResponseAPI()

        try:

            # Set the status of the request a success
            response.status = True

            # Return the data
            response.value = readingReviewService.delete(id)

        except ValueError as e:

            # Set the status of the request as failed
            response.status = False

            # Send the message of why it failed
            response.msg = str(e)

        # Return the response
        return Response(status = 200, data = response.__dict__)