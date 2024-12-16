# chatbot-clintell
chatbot-clintell

# Proyecto BackEnd - Chatbot para Clintell

Este es el backend del proyecto, construido con Django y Django REST Framework. Proporciona una API para gestionar usuarios y mensajes de chat.

## Requisitos

- Python 3.10
- Django
- Django REST Framework
- PostgreSQL 

## Instalación

1. **Clonar el repositorio:**
    ```bash
   git clone https://github.com/michael23499/chatbot-clintell.git
   cd chatbotclintell/backend

python -m venv venv
source venv/bin/activate  # En Windows usa `venv\Scripts\activate`

Instalar dependencias:
pip install -r requirements.txt

Migrar la base de datos:
python manage.py migrate

Crear un superusuario:
python manage.py chatbot_user

Ejecutar el servidor:
python manage.py runserver

Endpoints
POST /api/register/: Registrar un nuevo usuario.
POST /api/login/: Iniciar sesión y obtener un token.
GET /api/usuario_logueado/: Obtener información del usuario logueado.
POST /api/guardar_mensaje/: Guardar un nuevo mensaje.
POST /api/token/: Obtener un nuevo token.

Construir la imagen:
docker build -t nombre_imagen .

Ejecutar el contenedor:
docker run -p 8000:8000 nombre_imagen

# Proyecto FrontEnd - Chatbot para Clintell

Este es el frontend de la aplicación, desarrollado en React. Esta aplicación permite a los usuarios interactuar con un asistente virtual.

## Tabla de Contenidos

- [Proyecto BackEnd - Chatbot para Clintell](#proyecto-backend---chatbot-para-clintell)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
- [Proyecto FrontEnd - Chatbot para Clintell](#proyecto-frontend---chatbot-para-clintell)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Instalación](#instalación-1)

## Características

- Interfaz de usuario interactiva.
- Autenticación de usuarios.
- Chat en tiempo real con un asistente virtual.
- Almacenamiento de mensajes en la base de datos.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js que facilita el manejo de rutas y peticiones.
- **CSS**: Para estilizar la aplicación.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/michael23499/chatbot-clintell.git

2. Navega al directorio del frontend:
   cd chatbotclintell/frontend

3. Instala las dependencias:
   npm install
Uso
Para iniciar la aplicación en modo de desarrollo, ejecuta:

npm start

Esto abrirá la aplicación en http://localhost:3000 en tu navegador, asegurate de haber levantando el backend primero, con python manage.py runserver

Despliegue
Para desplegar la aplicación, puedes construir la imagen de Docker:
docker build -t nombre_de_la_imagen .

Y luego ejecutar el contenedor:
docker run -p 3000:3000 nombre_de_la_imagen


Tareas Que me quedaron Pendientes
Integración del Chat Pequeño:

Se planificó la integración de un componente de chat más pequeño y simplificado para gestionar las consultas de los usuarios. Esta decisión se tomó debido a las incongruencias observadas en el chat grande, lo que llevó a optar por un enfoque más directo y eficiente.

Conexión a la Base de Datos:

El componente de chat pequeño aún necesita ser conectado a la base de datos para almacenar adecuadamente las consultas y respuestas. Esta funcionalidad es crucial para mantener un registro de las interacciones y facilitar el análisis posterior.

Entrenamiento Adicional de la IA:

Es necesario realizar un entrenamiento adicional del modelo de IA para mejorar la calidad de las respuestas generadas. Este proceso incluirá la incorporación de datos históricos de las consultas almacenadas en la base de datos, lo que permitirá optimizar el rendimiento y la precisión del sistema, actualmente da respuestas óptimas de temas como: 
- inteligencia artificial
- Beneficios de implementar IA
- ¿Cómo puedo implementar IA en mi negocio?
- Proporcionar pasos para solucionar problemas comunes
- ¿Dónde puedo aprender más sobre IA?
- Tendencias en IA
- ¿Puedes darme ejemplos de éxito en IA?
- ¿Cómo puedo dar retroalimentación sobre este servicio?
- No entiendo un concepto de IA
