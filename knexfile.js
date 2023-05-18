const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_DEBUG,
  DATABASE_PASSWORD,
  DATABASE_SOCKETPATH,
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
      database: DATABASE_NAME,
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
    debug: DATABASE_DEBUG,
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER,
      database: DATABASE_NAME,
      password: DATABASE_PASSWORD,
      socketPath: DATABASE_SOCKETPATH,
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
