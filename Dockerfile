# Use a imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de configuração do pacote (package.json e package-lock.json)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta que sua aplicação Node.js está ouvindo (substitua a porta 3000 se necessário)
EXPOSE 3000

# Execute as migrações do Knex antes de iniciar o aplicativo
RUN npx knex migrate:latest

# Execute o comando de inicialização do seu aplicativo (substitua "node app.js" pelo seu comando de inicialização)
CMD ["node", "index"]
