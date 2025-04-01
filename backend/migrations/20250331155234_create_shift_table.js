/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE IF NOT EXISTS shift(
        id SERIAL PRIMARY KEY,
        shift_number INTEGER NOT NULL, 
        start_time TIME NOT NULL,     
        end_time TIME NOT NULL,        
        description VARCHAR(255)
        );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`DROP TABLE IF EXISTS shift;`);
};
