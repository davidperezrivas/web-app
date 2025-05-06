# Usa la imagen base de Node.js
FROM node:22.11.0

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto (solo los de configuración de dependencias)
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto para la aplicación React
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo de React
CMD ["npm", "start"]
