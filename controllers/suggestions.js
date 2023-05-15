const express = require('express');
const router = express.Router();
const { chat } = require('../services/openia');

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;

        const { choices: [{ message: { content } }] } = await chat(email, `
            Sugira três coisas para esse usuário pedir à inteligência artificial, em no máximo três palavras.
            Retorne a resposta em formato JSON desse jeito: [{"suggestion": "sugestão", "emoji": "emoji"}]
        `);

        res.json(content);
    } catch (error) {
        console.error(error, 'Suggestions Error');

        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;