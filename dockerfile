FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm installq

COPY . .

EXPOSE 3005

CMD [ "npm", "run", "start:dev" ]