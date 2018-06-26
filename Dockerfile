FROM node:carbon

RUN mkdir /app
WORKDIR /app

COPY package.json /app/

RUN npm install

EXPOSE 5002
ENV E_LAPS_MONGO_URL mongodb://mongo/
ENV E_LAPS_DATABASE elaps

CMD [ "npm", "start" ]