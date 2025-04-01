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
module.exports = { createSpend };
