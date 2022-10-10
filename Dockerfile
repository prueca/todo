FROM node:alpine
COPY . /app/
WORKDIR /app
RUN apk add python3 make g++
RUN npm i -g nodemon
RUN npm i
RUN npm rebuild node-sass
EXPOSE 3000
ENTRYPOINT /app/run.sh