require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const createSpendQuery = `
        INSERT INTO spend(
            admin_id,
            worker_id,
            town_id,
            operator_id,
            cost,
            category
        )
        VALUES (?,?,?,?,?,?)
        RETURNING *;
`;
const filterSpendQuery = `
SELECT 
    s.id,
    s.cost,
    s.category,
    a.login AS admin_name,
    w.name AS worker_name,
    t.name AS town_name,
    o.login AS operator_name,
    s.created_at
    FROM spend AS s
    LEFT JOIN admin AS a ON s.admin_id = a.id
    LEFT JOIN worker AS w ON s.worker_id = w.id
    LEFT JOIN town AS t ON s.town_id = t.id
    LEFT JOIN operator AS o ON s.operator_id = o.id 
    WHERE s.created_at >= ?  
    AND s.created_at <= ? 
    GROUP BY s.id, s.cost, admin_name, worker_name, town_name, operator_name, s.created_at;
`;

const filterSpend = async (from, to) => {
  try {
    const res = await knex.raw(filterSpendQuery, [from, to]);
    return res.rows;
  } catch (e) {
    console.log("error from filterSpend\t" + e.message);
    throw e;
  }
};
const createSpend = async (
  admin_id,
  worker_id,
  town_id,
  operator_id,
  cost,
  category
) => {
  try {
    const res = await knex.raw(createSpendQuery, [
      admin_id,
      worker_id,
      town_id,
      operator_id,
      cost,
      category,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from createSpend\t" + e.message);
    throw e;
  }
};
module.exports = { createSpend, filterSpend };
