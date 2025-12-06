from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Este nombre de usuario ya está en uso."
            )
        ],
    )
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Este correo ya está registrado."
            )
        ],
    )
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        style={'input_type': 'password', 'placeholder': 'Contraseña segura'}
    )

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            password=validated_data["password"],
        )
        return user
