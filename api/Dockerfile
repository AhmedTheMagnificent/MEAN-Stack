FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV MONGO_URL=mongodb://mongo:27017/my-database

EXPOSE 3000

RUN ["node", "app.js"]