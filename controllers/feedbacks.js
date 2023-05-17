const db = require('../utils/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url, type, message, email } = req.body;

    const users = db('users');
    const feedbacks = db('feedbacks');

    const [user] = await users.where({ email });

    if (!user) return res.sendStatus(400);

    await feedbacks.insert({
        url,
        type,
        message,
        user_id: user.id,
    });

    res.sendStatus(201);
});

module.exports = router;