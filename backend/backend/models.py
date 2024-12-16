from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)  # Agregar campo name
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'backend_user'  # Nombre de la tabla en la base de datos

    def __str__(self):
        return self.email


class MensajeChat(models.Model):
    usuario_id = models.IntegerField()
    mensaje = models.CharField(max_length=300)
    respuesta = models.CharField(max_length=500)
    fecha = models.DateTimeField(auto_now_add=True)  # Cambiado de 'timestamp' a 'fecha'

    class Meta:
        db_table = 'mensajes_chat'

