/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('qualification', (table) => {
    table.increments('qualification_id')
    table.integer('persona_id').unsigned().notNullable()
    table.string('sort', 30).notNullable()
    table.string('quality', 50).notNullable()
    table.string('status', 50).notNullable().defaultTo('active')
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.datetime('deleted_at', { precision: 6 })

    table.foreign('persona_id').references('persona_id').inTable('persona')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists('qualification')
};
