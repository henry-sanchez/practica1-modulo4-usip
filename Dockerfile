FROM node:18-alpine AS build
WORKDIR /backend
COPY package.json .
RUN npm install -g nodemon
RUN npm install
COPY . .
ENV DB_URL 'mongodb://mongo_admin_user:mongo_admin_password@0.0.0.0:27017'
ENV DB_NAME 'admin'
CMD ['bash']