import knexfile from '../../../knexfile'
export const db = require('knex')({
  client: 'pg',
  connection: knexfile
})
