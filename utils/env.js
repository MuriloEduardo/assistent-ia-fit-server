require('dotenv').config();

console.log('TESTE 1', process.env.NODE_ENV);

module.exports = {
    PORT: process.env.PORT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
};