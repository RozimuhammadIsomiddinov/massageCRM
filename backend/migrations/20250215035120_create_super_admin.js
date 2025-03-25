exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE IF NOT EXISTS super_admin (
      id SERIAL PRIMARY KEY,
      login VARCHAR(255),
      password VARCHAR(255),
      role VARCHAR(20) DEFAULT 'super_admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
      `);
};

exports.down = function (knex) {
  return knex.raw(`
          DROP TABLE IF EXISTS super_admin;
          `);
};
