require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    INSTANCE_CONNECTION_NAME: process.env.INSTANCE_CONNECTION_NAME,
};