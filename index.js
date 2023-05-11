const cors = require('cors');
const express = require('express');
const app = express();
const knexConfig = require('./knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(knexConfig);

app.use(cors());
app.use(express.json());

const users = knex('users');

app.post('/users', async (req, res) => {
    const { displayName, email, photoURL } = req.body;

    const [user] = await users.where('email', email);

    if (user) {
        return res.sendStatus(200);
    }

    await users.insert({
        email,
        photo: photoURL,
        name: displayName,
    });

    res.sendStatus(201);
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
