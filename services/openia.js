const db = require('../utils/db');
const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const makeObjToString = obj =>
    Object.entries(obj)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => `${key}: ${value}`).join(', ');

const chat = async (email, content, body, options) => {
    const usersTable = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');

    let [user] = await usersTable.where({ email });
    let instructions = await instructionsTable.where({ user_id: user?.id });
    let [personalInformation] = await personalInformationTable.where({ user_id: user?.id });

    user = makeObjToString(user);
    personalInformation = makeObjToString(personalInformation);

    let formatedInstructions = instructions.map(({ content }) => ({
        content,
        role: 'system',
    }));

    formatedInstructions = [
        ...formatedInstructions,
        {
            content: `Informações sobre usuário: ${user}`,
            role: 'system',
        },
        {
            content: `Informações físicas sobre usuário: ${personalInformation}`,
            role: 'system',
        },
    ];

    const { data } = await openai.createChatCompletion(
        {
            ...body,
            model: 'gpt-3.5-turbo',
            temperature: 0,
            messages: [
                ...formatedInstructions,
                { role: 'user', content },
            ],
        },
        { ...options },
    );

    return data;
};

const completion = async (email, prompt) => {
    const usersTable = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');

    let [{ id: user_id, name }] = await usersTable.where({ email }).select('id', 'name');
    let instructions = await instructionsTable.where({ user_id });
    let [personalInformation] = await personalInformationTable.where({ user_id });

    let user = makeObjToString({ name });
    personalInformation = makeObjToString(personalInformation);

    let formatedInstructions = instructions.map(({ content }) => content);

    formatedInstructions = [
        ...formatedInstructions,
        `Informações sobre usuário: ${user}`,
        `Informações físicas sobre usuário: ${personalInformation}`,
    ];

    formatedInstructions = formatedInstructions.join('\n');

    const { data } = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0,
        prompt: `
            ${formatedInstructions}
            ${prompt}
        `,
    });

    return data;
};

module.exports = {
    chat,
    completion,
};