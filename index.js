const cors = require('cors');
const express = require('express');
const { CLIENT_URL } = require('./utils/env');

const app = express();

app.use(cors({
    origin: CLIENT_URL,
}));
app.use(express.json());

require('express-ws')(app);

const usersController = require('./controllers/users');
const messagesController = require('./controllers/messages');
const suggestionsController = require('./controllers/suggestions');

app.use('/users', usersController);
app.use('/messages', messagesController);
app.use('/suggestions', suggestionsController);

app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
);
