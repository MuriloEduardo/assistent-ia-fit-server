const express = require('express');
const router = express.Router();
const { chat } = require('../services/openia');

router.ws('/', (ws, req) => {
    ws.on('message', async (message) => {
        const { email } = req.query;

        const parseMessage = JSON.parse(message);

        const data = await chat(email, parseMessage, { stream: true }, { responseType: 'stream' });

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