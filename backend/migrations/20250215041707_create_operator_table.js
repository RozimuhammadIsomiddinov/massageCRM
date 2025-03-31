exports.up = function (knex) {
  return knex.raw(`
      CREATE TABLE IF NOT EXISTS operator(
      id SERIAL PRIMARY KEY,
      town_id INTEGER REFERENCES town(id) ON DELETE CASCADE,
      admin_id INTEGER REFERENCES admin(id) ON DELETE CASCADE,
      branch_id INTEGER REFERENCES branch(id) ON DELETE CASCADE,
      login VARCHAR(255),
      password VARCHAR(255),
      role VARCHAR(20) DEFAULT 'operator',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
          `);
};

exports.down = function (knex) {
  return knex.raw(`
          DROP TABLE IF EXISTS operator;
          `);
};
