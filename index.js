const cors = require('cors');
const express = require('express');

const app = express();
require('express-ws')(app);

const usersController = require('./controllers/users');
const messagesController = require('./controllers/messages');
const suggestionsController = require('./controllers/suggestions');

app.use(cors());
app.use(express.json());

app.use('/users', usersController);
app.use('/messages', messagesController);
app.use('/suggestions', suggestionsController);

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
