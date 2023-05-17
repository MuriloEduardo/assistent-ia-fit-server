const db = require('../utils/db');
const express = require('express');
const router = express.Router();
const { chat, makeObjToString } = require('../services/openia');

router.get('/', async (req, res) => {
    const { email } = req.query;

    const usersTable = db('users');
    const instructionsTable = db('instructions');
    const personalInformationTable = db('personal_information');
    const suggestionsInstructionsTable = db('suggestions_instructions');

    const [user] = await usersTable.where({ email }).select('id', 'name');
    const instructions = await instructionsTable.where({ user_id: user?.id });
    const [personalInformation] = await personalInformationTable.where({ user_id: user?.id });
    const suggestionsInstructions = await suggestionsInstructionsTable.where({ user_id: user?.id })

    const messages = [{
        role: 'system',
        content: `Esse é o usuário: ${makeObjToString({ name: user?.name })}`,
    }];

    if (personalInformation) {
        messages.push({
            role: 'system',
            content: makeObjToString(personalInformation),
        });
    }

    if (instructions.length) {
        const formatedInstructions = instructions.map(({ content }) => ({
            role: 'system',
            content,
        }));

        messages.push(...formatedInstructions);
    }

    if (suggestionsInstructions.length) {
        const formatedSuggestionsInstructions = suggestionsInstructions.map(({ content }) => ({
            role: 'system',
            content,
        }));

        messages.push(...formatedSuggestionsInstructions);
    }

    const paylod = {
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages,
    };

    const { choices: [{ message: { content } }] } = await chat(paylod);

    res.json(content);
});

module.exports = router;