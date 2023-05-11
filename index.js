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

    res.sendStatus(200);
});

app.ws('/messages', (ws, req) => {
    ws.on('message', async (message) => {
        const response = await chat(message);

        const { choices: [{ message: { content } }] } = response;

        ws.send(content);
    });
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
