# Utiliza una imagen base de Node.js para construir la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencia del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación React
RUN npm run build

# Utiliza una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos estáticos generados a la carpeta de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponer el puerto 3000
EXPOSE 3000

# Inicia el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
