/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS spend(
    id SERIAL PRIMARY KEY,
    admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
    worker_id INTEGER REFERENCES worker(id) ON DELETE CASCADE,
    town_id INTEGER REFERENCES town(id) ON DELETE CASCADE,
    operator_id INTEGER REFERENCES operator(id) ON DELETE CASCADE,
    cost INTEGER,
    category VARCHAR(255),
    description VARCHAR(255),
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
  return knex.raw(`
        DROP TABLE IF EXISTS spend;
        `);
};
