FROM node:latest
ENV NODE_ENV production
COPY . /usr/src
WORKDIR /usr/src
RUN npm install
CMD ["npm","run","dev"]