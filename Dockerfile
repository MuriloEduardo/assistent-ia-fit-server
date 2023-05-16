FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV NODE_ENV staging

CMD ["npm", "start"]
