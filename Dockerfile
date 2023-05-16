FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

RUN npx knex migrate:latest

CMD ["node", "index"]
