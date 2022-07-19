FROM node:16-alpine

WORKDIR /app

VOLUME /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]