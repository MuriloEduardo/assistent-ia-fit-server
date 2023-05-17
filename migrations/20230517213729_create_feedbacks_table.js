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
    return knex.schema.dropTableIfExists('feedbacks');
};
