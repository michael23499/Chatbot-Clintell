import requests
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, MensajeChat
from .serializers import UserSerializer, MensajeSerializer
from rest_framework.views import APIView
import json
import logging
from .models import MensajeChat
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

logger = logging.getLogger(__name__)

from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logueado(request):
    user = request.user  # Obtiene el usuario autenticado
    return Response({'name': user.name}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Usuario creado exitosamente.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email)
        if check_password(password, user.password):
            return Response({'message': 'Inicio de sesión exitoso.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Credenciales incorrectas.'}, status=status.HTTP_401_UNAUTHORIZED)
    
    except User.DoesNotExist:
        return Response({'message': 'Este usuario no existe.'}, status=status.HTTP_404_NOT_FOUND)

class MensajeChatView(APIView):
    def post(self, request):
        serializer = MensajeSerializer(data=request.data)
        if serializer.is_valid():
            MensajeChat.objects.create(
                usuario_id=serializer.validated_data['usuario_id'],
                mensaje=serializer.validated_data['mensaje'],
                respuesta=serializer.validated_data['respuesta']
            )
            return Response({"message": "Mensaje guardado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def guardar_mensaje(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        serializer = MensajeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Esto guardará el objeto en la tabla 'mensajes_chat'
            return JsonResponse({'status': 'success', 'message': 'Mensaje guardado'}, status=201)

        return JsonResponse({'status': 'error', 'message': serializer.errors}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)