const { NODE_ENV } = require('../utils/env');

console.log('TESTE 2', NODE_ENV);

const knexConfig = require('../knexfile')[NODE_ENV];
const db = require('knex')(knexConfig);

module.exports = db;