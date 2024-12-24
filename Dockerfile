# Use Node.js 18 for development
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_URL=http://localhost
EXPOSE 3000
CMD ["npm", "start"]
