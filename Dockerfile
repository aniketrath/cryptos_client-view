# Use the official Node.js image as the base image
FROM node:18 AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
