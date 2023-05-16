require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || 'development',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_DATABASE_HOST: process.env.PG_DATABASE_HOST,
    PG_DATABASE_USER: process.env.PG_DATABASE_USER,
    PG_DATABASE_PASSWORD: process.env.PG_DATABASE_PASSWORD,
};