const knexConfig = require('../knexfile')[NODE_ENV];
const db = require('knex')(knexConfig);

module.exports = db;