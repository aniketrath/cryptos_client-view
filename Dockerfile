# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for web access
EXPOSE 80
# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
