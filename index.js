const cors = require('cors');
const express = require('express');
const app = express();
const knexConfig = require('./knexfile')[process.env.NODE_ENV || 'development'];
const db = require('knex')(knexConfig);

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

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
