const { OPENAI_API_KEY } = require('../utils/env');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async content => {
    const { data } = await openai.createChatCompletion(
        {
            stream: true,
            model: 'gpt-3.5-turbo',
            temperature: 0,
            messages: [
                {
                    role: 'system', content: `
                Só de respostas que envolvam saúde atividades físicas, lazer e alimentação.
                Seu único objetivo é ajudar o usuário a ter dicas sobre rotinas, dietas, treinos, coisas para sair do tédio.
                Responsa com poucas palavras e de forma concisa, preferencialmente trazendo listas de coisas a fazer, bem formatado.
                `
                },
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