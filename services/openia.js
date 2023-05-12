const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async (content, db) => {
    const instructionsTable = db('instructions');
    let instructions = await instructionsTable.where({ user_id: 1 });

    const formatedInstructions = instructions.map(({ content }) => ({
        content,
        role: 'system',
    }));

    const { data } = await openai.createChatCompletion(
        {
            stream: true,
            model: 'gpt-3.5-turbo',
            temperature: 0,
            messages: [
                ...formatedInstructions,
                { role: 'user', content },
            ],
        },
        { responseType: 'stream' },
    );

    return data;
};

module.exports = {
    chat,
};