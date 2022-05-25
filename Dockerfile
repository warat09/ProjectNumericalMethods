FROM node:17.8

RUN mkdir /usr/src/app

WORKDIR  /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app/

COPY package.json /usr/src/app/package.json

RUN npm install

RUN npm install react-scripts -g

CMD [ "npm","start" ]