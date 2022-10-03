// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      host: 'localhost',
      port: 5434,
      database: 'pretor',
      user: 'pretor',
      password: '123',
      ssl: false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: './database/knex/migrations/developement'
    },
    seeds: {
      directory: './database/knex/seeds'
    }
  },

  staging: process.env.DATABASE_URL || {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: './database/knex/migrations/staging'
    },
    seeds: {
      directory: './database/knex/seeds'
    }
  },

  production: process.env.DATABASE_URL || {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: './database/knex/migrations/production'
    },
    seeds: {
      directory: './database/knex/seeds'
    }
  }
}
