/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE IF NOT EXISTS operator_shift(
        id SERIAL PRIMARY KEY,
        operator_id INTEGER REFERENCES operator(id) ON DELETE CASCADE,
        shift_id INTEGER REFERENCES shift(id) ON DELETE CASCADE,
        work_date DATE NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.raw(`DROP TABLE IF EXISTS operator_shift;`);
};
