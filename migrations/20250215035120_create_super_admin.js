exports.up = function (knex) {
  return knex.raw(`
      CREATE TABLE  IF NOT EXISTS super_admin (
      id SERIAL PRIMARY KEY,
      login VARCHAR(255) ,
      password VARCHAR(255),
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
