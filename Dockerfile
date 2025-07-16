# Usar una imagen base de Node.js con Alpine Linux
FROM node:22-alpine

# Instalar Caddy
RUN apk add --no-cache caddy

# Crear un directorio para la aplicación
WORKDIR /app

# Copiar package.json y yarn.lock al contenedor
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Copiar el Caddyfile a la configuración de Caddy
# Caddy buscará este archivo automáticamente al iniciar
COPY Caddyfile /etc/caddy/Caddyfile

# Construir la aplicación
RUN yarn build

# Exponer el puerto en el que Caddy escuchará
EXPOSE 80

# Comando para iniciar Caddy usando la configuración del Caddyfile
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]