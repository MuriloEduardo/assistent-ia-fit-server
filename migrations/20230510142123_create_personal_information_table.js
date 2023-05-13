/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('personal_information', (table) => {
        table.string('sex');
        table.string('age');
        table.string('weight');
        table.string('height');
        table.integer('user_id').unsigned();
        table.string('current_physical_activity_level');
        table.string('physical_activities_already_practice');
        table.timestamps(true, true);

        table.foreign('user_id').references('users.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('personal_information');
};
