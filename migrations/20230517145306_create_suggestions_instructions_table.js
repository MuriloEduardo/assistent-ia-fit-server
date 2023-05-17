/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('suggestions_instructions', (table) => {
        table.increments('id').primary();
        table.text('content').notNullable();
        table.integer('user_id').unsigned();
        table.timestamps(true, true);

        table.foreign('user_id').references('users.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('suggestions_instructions');
};
