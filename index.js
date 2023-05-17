const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
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
