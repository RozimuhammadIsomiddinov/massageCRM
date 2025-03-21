exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE  IF NOT EXISTS branch (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);
};

exports.down = function (knex) {
  return knex.raw(`
        DROP TABLE IF EXISTS branch;
        `);
};
