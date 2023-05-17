const db = require('../utils/db');
const express = require('express');
const router = express.Router();
const { chat } = require('../services/openia');

router.get('/', async (req, res) => {
    const { email } = req.query;

    const { choices: [{ message: { content } }] } = await chat(email, undefined, undefined, undefined, true);

    res.json(content);
});

module.exports = router;