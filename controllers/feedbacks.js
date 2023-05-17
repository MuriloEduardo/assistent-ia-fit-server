const db = require('../utils/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url, type, message, email } = req.body;

    const feedbacks = db('feedbacks');

    const [user] = await users.where({ email });

    if (!user) return res.sendStatus(400);

    await feedbacks.insert({
        url,
        email,
        type,
        message,
    });

    res.sendStatus(201);
});

module.exports = router;