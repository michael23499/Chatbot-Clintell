# Usar la imagen base de Python 3.10 en Alpine
FROM python:3.10-alpine

# Configurar variables de entorno
ENV PYTHONUNBUFFERED 1  # No almacenar en buffer la salida de Python
ENV PYTHONDONTWRITEBYTECODE 1  # No generar archivos .pyc

# Establecer el directorio de trabajo
WORKDIR /app/backend

# Copiar el archivo de requisitos al contenedor
COPY requirements.txt /app/backend/

# Instalar dependencias necesarias para compilar psycopg2-binary
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk --purge del .build-deps  # Eliminar dependencias de construcción

# Copiar el resto de la aplicación al contenedor
COPY . /app/backend/

# Comando para ejecutar el servidor
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
