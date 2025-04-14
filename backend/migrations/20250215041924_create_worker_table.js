exports.up = function (knex) {
  return knex.raw(`
      CREATE TABLE IF NOT EXISTS worker(
      id SERIAL PRIMARY KEY,
      branch_id INTEGER REFERENCES branch(id) ON DELETE CASCADE,
      town_id INTEGER REFERENCES town(id) ON DELETE CASCADE,
      operator_id INTEGER REFERENCES operator(id) ON DELETE CASCADE,
      name VARCHAR(255),
      percent NUMERIC(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
          `);
};

exports.down = function (knex) {
  return knex.raw(`
          DROP TABLE IF EXISTS worker;
          `);
};
