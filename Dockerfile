FROM node:latest

RUN mkdir usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./run.sh

CMD ["./run.sh"]