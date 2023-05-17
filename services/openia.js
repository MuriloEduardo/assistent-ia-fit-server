const db = require('../utils/db');
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

const chat = async (email, userContent, body, options, suggestions = false) => {
    const usersTable = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');

    let [user] = await usersTable.where({ email });
    let instructions = await instructionsTable.where({ user_id: user?.id });
    let [personalInformation] = await personalInformationTable.where({ user_id: user?.id });

    let suggestionsInstructions;
    if (suggestions) {
        const suggestionsInstructionsTable = db('suggestions_instructions');
        suggestionsInstructions = await suggestionsInstructionsTable.where({ user_id: user?.id });
    }

    user = makeObjToString(user);
    personalInformation = makeObjToString(personalInformation);

    let formatedInstructions = instructions.map(({ content }) => ({
        content,
        role: 'system',
    }));

    let formatedSuggestionsInstructions = suggestionsInstructions.map(({ content }) => ({
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
        ...formatedSuggestionsInstructions,
    ];

    const { data } = await openai.createChatCompletion(
        {
            ...body,
            model: 'gpt-3.5-turbo',
            temperature: 0,
            messages: [
                ...formatedInstructions,
                { role: 'user', userContent },
            ],
        },
        { ...options },
    );

    return data;
};

module.exports = {
    chat,
};