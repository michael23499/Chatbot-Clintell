from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from .models import MensajeChat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password'] 

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # Hashear la contraseña
        return super().create(validated_data)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value
    
class MensajeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeChat
        fields = ['usuario_id', 'mensaje', 'respuesta']
