# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
# Declare build arguments (environment variables)
ARG REACT_APP_API_URL
ARG REACT_APP_ADMIN_PANEL
ENV REACT_APP_API_URL $REACT_APP_API_URL
ENV REACT_APP_ADMIN_PANEL $REACT_APP_ADMIN_PANEL
RUN npm run build

# Nginx stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
