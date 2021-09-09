FROM node:12-alpine

RUN apk add yarn bash python

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN yarn
CMD ["yarn", "start"]