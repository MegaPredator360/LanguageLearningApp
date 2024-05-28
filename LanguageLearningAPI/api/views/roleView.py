from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.services.roleService import RoleService
from api.dtos.responseAPI import ResponseAPI

# Declare the service to use
roleService = RoleService()

@api_view(['GET'])
def roleList(request):

    response = ResponseAPI()

    try:

        # Set the status of the request a success
        response.status = True

        # Return the data
        response.value = roleService.list()

    except ValueError as e:

        # Set the status of the request as failed
        response.status = False

        # Send the message of why it failed
        response.msg = str(e)

    # Return the response
    return Response(status = 200, data = response.__dict__)