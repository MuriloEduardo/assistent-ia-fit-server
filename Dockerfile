FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV NODE_ENV staging
ENV PG_DATABASE_HOST $PG_DATABASE_HOST

RUN npx knex migrate:latest

CMD ["node", "index"]
