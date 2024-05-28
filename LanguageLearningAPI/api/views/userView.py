from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.dtos.responseAPI import ResponseAPI
from LanguageLearningAPI.api.services.userService import UserService

# Declare the service to use
userService = UserService()

@api_view(['GET'])
def userList(request):

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
def userCreate(request):

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
def userUpdate(request):

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
def userDelete(request, id: int):

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