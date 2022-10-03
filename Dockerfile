FROM node:16-slim
LABEL maintainer="Oleomar Buchner"

WORKDIR /usr/src/pretor-api
COPY ./package.json .
RUN npm install --omit=dev
