const {
  DATABASE,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PASSWORD,
} = require('./utils/env');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: DATABASE_HOST,
      database: DATABASE,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      port: 3306,
      host: DATABASE_HOST,
      database: DATABASE,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
