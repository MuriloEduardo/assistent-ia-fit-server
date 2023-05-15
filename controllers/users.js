const db = require('../utils/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
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

router.patch('/:email', async (req, res) => {
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

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    const users = db('users');
    const informations = db('personal_information');

    const [user] = await users.where({ email });

    if (!user) return res.sendStatus(400);

    const [information] = await informations.where({ user_id: user.id });

    res.json(information);
});

module.exports = router;