from django.shortcuts import render
from rest_framework import generics
from api.models.role import Role
from api.serializers.roleSerializer import RoleSerializer

# Obtain role list
class RoleList(generics.ListAPIView):

    # SQL Query
    queryset = Role.objects.all()

    # Serializer
    serializer_class = RoleSerializer