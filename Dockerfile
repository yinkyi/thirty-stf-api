FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 8007

CMD [ "npm", "run", "start" ]
