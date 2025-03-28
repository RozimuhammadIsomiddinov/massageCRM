/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE IF NOT EXISTS file(
        id SERIAL PRIMARY KEY,
        offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE,
        file VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`
        DROP TABLE IF EXISTS file;
    `);
};
