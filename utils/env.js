require('dotenv').config();

module.exports = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DATABASE_DEBUG: process.env.DATABASE_DEBUG,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_SOCKETPATH: process.env.DATABASE_SOCKETPATH,
};