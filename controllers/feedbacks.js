const db = require('../utils/db');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { url, type, message, email } = req.body;

    const feedbacks = db('feedbacks');

    await feedbacks.insert({
        url,
        type,
        email,
        message,
    });

    res.sendStatus(201);
});

module.exports = router;