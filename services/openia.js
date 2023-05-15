const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async (email, content, db) => {
    const users = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');

    let [user] = await users.where({ email });
    let instructions = await instructionsTable.where({ user_id: user?.id });
    let [personalInformation] = await personalInformationTable.where({ user_id: user?.id });

    const makeObjToString = obj =>
        Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');

    user = makeObjToString(user);
    personalInformation = makeObjToString(personalInformation);

    let formatedInstructions = instructions.map(({ content }) => ({
        content,
        role: 'system',
    }));

    formatedInstructions = [...formatedInstructions, {
        content: `Informações sobre usuário: ${user}`,
        role: 'system',
    }];

    formatedInstructions = [...formatedInstructions, {
        content: `Informações físicas sobre usuário: ${personalInformation}`,
        role: 'system',
    }];

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