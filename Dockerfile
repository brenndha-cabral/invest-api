FROM node:14-alpine

WORKDIR /app

VOLUME /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"] 