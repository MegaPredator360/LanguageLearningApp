from rest_framework import serializers
from api.models.user import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'password', 'birth_date', 'country', 'id_role']