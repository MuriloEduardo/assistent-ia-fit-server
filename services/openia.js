const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async content => {
    const { data } = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Só de respostas que envolvam saúde atividades físicas, lazer e alimentação. Seu único objetivo é ajudar o usuário a ter dicas sobre rotinas, dietas, treinos, coisas para sair do tédio. Seja sempre curto e direto, preferencialmente trazendo listas de coisas a fazer.' },
            { role: 'user', content },
        ],
    });

    return data;
};

module.exports = {
    chat,
};