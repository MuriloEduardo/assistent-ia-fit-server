const cors = require('cors');
const express = require('express');
const { NODE_ENV } = require('./utils/env');
const { chat } = require('./services/openia');

const knexConfig = require('./knexfile')[NODE_ENV];
const db = require('knex')(knexConfig);

const app = express();
require('express-ws')(app);

app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    const { displayName, email, photoURL } = req.body;

    const users = db('users');

    const [user] = await users.where({ email });

    if (!user) {
        await users.insert({
            email,
            photo: photoURL,
            name: displayName,
        });

        return res.sendStatus(201);
    }

    res.sendStatus(204);
});

app.patch('/users/:email', async (req, res) => {
    const { email } = req.params;
    const { sex, age, weight, height, current_physical_activity_level, physical_activities_already_practice } = req.body;

    const users = db('users');
    const informations = db('personal_information');

    const [user] = await users.where({ email });

    if (!user) return res.sendStatus(400);

    const [information] = await informations.where({ user_id: user.id });

    if (!information) {
        await informations.insert({
            sex,
            age,
            weight,
            height,
            user_id: user.id,
            current_physical_activity_level,
            physical_activities_already_practice,
        });

        return res.sendStatus(201);
    }

    await informations
        .where({ user_id: user.id })
        .update({
            sex,
            age,
            weight,
            height,
            current_physical_activity_level,
            physical_activities_already_practice,
        });

    res.sendStatus(204);
});

app.get('/users/:email', async (req, res) => {
    const { email } = req.params;

    const users = db('users');
    const informations = db('personal_information');

    const [user] = await users.where({ email });

    if (!user) return res.sendStatus(400);

    const [information] = await informations.where({ user_id: user.id });

    res.json(information);
});

app.ws('/messages', (ws, req) => {
    ws.on('message', async (message) => {
        const { email } = req.query;

        const formmatMessage = JSON.parse(message);

        const data = await chat(email, formmatMessage, db);

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

        data.on('error', err => console.error(err));
    });
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
