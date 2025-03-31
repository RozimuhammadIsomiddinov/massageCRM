/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE  IF NOT EXISTS town (
    id SERIAL PRIMARY KEY,
    branch_id INTEGER REFERECES branch(id) ON DELETE CASCADE,
    name VARCHAR(255) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(` DROP TABLE IF EXISTS town;`);
};
