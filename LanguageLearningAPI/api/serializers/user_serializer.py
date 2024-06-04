from rest_framework import serializers
from api.models.user import User

class UserSerializer(serializers.ModelSerializer):

    # To reflect the name of the role
    role_name = serializers.CharField(source = 'id_role.role_name', read_only = True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'password', 'birth_date', 'country', 'active', 'role', 'role_name']