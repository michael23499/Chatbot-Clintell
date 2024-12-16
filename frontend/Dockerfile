# Usar la imagen base de Node.js en la versión 20.11 con Alpine Linux
FROM node:20.11-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app/frontend/

# Copiar los archivos de configuración de npm (package.json y package-lock.json) al directorio de trabajo
COPY package*.json /app/frontend/

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo
COPY . /app/frontend/

# Comando por defecto para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
