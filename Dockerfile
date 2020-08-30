FROM node:latest
COPY . /usr/src
WORKDIR /usr/src
RUN npm install
CMD ["npm","run","dev"]