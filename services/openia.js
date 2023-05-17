const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const makeObjToString = obj => {
    if (!obj) return '';

    return Object.entries(obj)
        .filter(([, value]) => !!value)
        .map(([key, value]) => `${key}: ${value}`).join(', ');
};

const chat = async (paylod, options) => {
    const { data } = await openai.createChatCompletion(paylod, options);

    return data;
};

module.exports = {
    chat,
    makeObjToString,
};