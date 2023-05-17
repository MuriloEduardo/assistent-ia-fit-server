const cors = require('cors');
const express = require('express');

const app = express();

require('express-ws')(app);

app.use(cors());
app.use(express.json());

const usersController = require('./controllers/users');
const messagesController = require('./controllers/messages');
const suggestionsController = require('./controllers/suggestions');

app.use('/users', usersController);
app.use('/messages', messagesController);
app.use('/suggestions', suggestionsController);

app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`)
);
