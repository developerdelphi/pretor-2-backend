/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('persona', (table) => {
    table.increments('persona_id')
    table.string('name', 150).notNullable()
    table.string('kind',1).notNullable().defaultTo('F')
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.datetime('deleted_at', { precision: 6 })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw('DROP TABLE IF EXISTS persona CASCADE')
};
