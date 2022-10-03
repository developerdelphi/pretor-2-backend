/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('address', (table) => {
    table.increments('address_id')
    table.integer('persona_id').unsigned().notNullable()
    table.string('street', 150).notNullable()
    table.string('number', 20)
    table.string('complement', 100)
    table.string('district', 50)
    table.string('cep', 10)
    table.string('city', 100)
    table.string('uf', 2)
    table.string('status', 50)
    table.text('obs')
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.datetime('deleted_at', { precision: 6 })

    table.foreign('persona_id').references('persona_id').inTable('persona')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('address')

};
