FROM node:8.15

#Install nodemon
RUN npm install -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependecies
COPY package.json .
RUN npm install

CMD ["nodemon"]