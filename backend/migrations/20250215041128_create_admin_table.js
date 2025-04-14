exports.up = function (knex) {
  return knex.raw(`
        CREATE TABLE  IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        branch_id INTEGER REFERENCES branch(id) ON DELETE CASCADE,
        login VARCHAR(255) ,
        password VARCHAR(255),
        percent NUMERIC(10,2),
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);
};

exports.down = function (knex) {
  return knex.raw(`
            DROP TABLE IF EXISTS admin;
            `);
};
