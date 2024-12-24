# Build Stage
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Nginx Stage
FROM nginx:alpine
# Copy custom Nginx config file
COPY nginx.conf /etc/nginx/nginx.conf
# Copy React build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
