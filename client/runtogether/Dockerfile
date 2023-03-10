FROM nginx:stable-alpine
FROM node:18-alpine
WORKDIR /runtogether/src/app
COPY package*.json ./
COPY package*.json ../


RUN npm install
RUN npm i @fortawesome/free-solid-svg-icons
RUN npm i @fortawesome/free-regular-svg-icons
RUN npm i react-infinite-scroll-component
RUN npm i @fortawesome/free-brands-svg-icons
RUN npm i @fortawesome/react-fontawesome
RUN npm install --save html2canvas
RUN npm install react-slick --save
RUN npm install slick-carousel --save
RUN npm install axios

COPY ./ ./
CMD [ "npm", "run","start" ]