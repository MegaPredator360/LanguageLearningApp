from rest_framework import serializers
from api.models.user import User

class UserSerializer(serializers.ModelSerializer):

    # To reflect the name of the role
    role_name = serializers.CharField(source = 'role.name', read_only = True)

    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'password', 'birth_date', 'country', 'active', 'role', 'role_name']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False, 'allow_blank': True}
        }

    def update(self, instance, validated_data):
        # If the password is empty, the value won't be validated
        password = validated_data.get('password', None)
        if password == '':
            validated_data.pop('password', None)

        return super().update(instance, validated_data)