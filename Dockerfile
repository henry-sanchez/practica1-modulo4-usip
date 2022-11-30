FROM node:18-alpine AS build
WORKDIR /backend
COPY package.json .
RUN npm install -g nodemon
RUN npm install
COPY . .
ENV DB_URL 'mongodb://mongo_user:mongo_pass@127.0.0.1:27017'
ENV DB_NAME 'diplomado'
RUN npm run dev