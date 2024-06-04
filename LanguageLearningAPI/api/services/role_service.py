from api.serializers.role_serializer import RoleSerializer
from api.models.role import Role

class RoleService:

    def list(self):

        try:

            # Obtain all roles
            roles = Role.objects.all()

            # We serialize the objects
            serializer = RoleSerializer(roles, many = True)

            return serializer.data

        except ValueError as e:

            # Send the exception
            raise e