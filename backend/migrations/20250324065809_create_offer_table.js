/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS offer (
      id SERIAL PRIMARY KEY,
      start_time TIME, 
      end_time TIME,
      cost INTEGER,
      admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
      worker_id INTEGER REFERENCES worker(id) ON DELETE CASCADE, 
      operator_id INTEGER REFERENCES operator(id) ON DELETE CASCADE,
      client_name VARCHAR(255),
      is_cancelled BOOLEAN DEFAULT false,
      prolongation INTERVAL,
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
    DROP TABLE IF EXISTS offer
    `);
};
