const db = require('../utils/db');
const express = require('express');
const router = express.Router();
const { chat, makeObjToString } = require('../services/openia');

const makePayload = async (email, message) => {
    const usersTable = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');

    const [user] = await usersTable.where({ email }).select('id', 'name');

    if (!user) {
        throw new Error('User not found');
    }

    const [personalInformation] = await personalInformationTable.where({ user_id: user.id });

    const instructions = await instructionsTable
        .where({ user_id: user.id })
        .orWhereNull('user_id');

    const messages = [{
        role: 'system',
        content: `Esse é o usuário: ${makeObjToString({ name: user.name })}`,
    }];

    if (personalInformation) {
        messages.push({
            role: 'system',
            content: makeObjToString(personalInformation),
        });
    }

    if (instructions.length) {
        const formatedInstructions = instructions.map(({ content }) => ({
            role: 'system',
            content,
        }));

        messages.push(...formatedInstructions);
    }

    if (message) {
        const parseMessage = JSON.parse(message);

        messages.push({
            role: 'user',
            content: parseMessage,
        });
    }

    return {
        model: 'gpt-3.5-turbo',
        temperature: 0,
        stream: true,
        messages,
    };
};

router.ws('/', (ws, req) => {
    ws.on('message', async (message) => {
        const { email } = req.query;

        const payload = await makePayload(email, message);

        const data = await chat(payload, { responseType: 'stream' });

        data.on('data', text => {
            let formmatText = text.toString();
            formmatText = formmatText.replaceAll('data: ', '');

            if (formmatText.includes('[DONE]')) return;

            try {
                JSON.parse(formmatText);
            } catch (error) {
                let messages = formmatText.split('\n');

                if (messages.length) {
                    messages = messages.filter(str => str !== '');

                    for (const str of messages) {
                        ws.send(str);
                    }

                    return;
                }
            }

            ws.send(formmatText);
        });

        data.on('error', err => console.error(err, 'Data on Error'));
    });
});

module.exports = router;