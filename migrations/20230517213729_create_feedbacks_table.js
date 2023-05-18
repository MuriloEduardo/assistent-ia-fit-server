/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('feedbacks', (table) => {
        table.increments('id').primary();
        table.string('url');
        table.string('type').notNullable();
        table.text('message').notNullable();
        table.string('email');
        table.boolean('resolved').defaultTo(false);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('feedbacks');
};
