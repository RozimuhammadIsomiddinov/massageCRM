require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectByIDQuery = `
        SELECT *FROM operator WHERE id = ?;
`;

const selectBy = `
  SELECT 
    o.id,
    o.login,
    o.password,
    o.role,
    branch.name AS branch_name,
    town.name AS town_name,
    admin.login AS admin_name,
    o.created_at,
    o.updated_at
  FROM operator AS o
  JOIN branch ON o.branch_id = branch.id
  JOIN admin ON o.admin_id = admin.id
  JOIN town ON o.town_id = town.id
  WHERE o.login = ?;
`;

const dailyAmountQuery = `
 SELECT 
  operator.id AS operator_id,
  operator.login,
  DATE(offer.created_at) AS date,
  SUM(offer.cost) AS total_amount
FROM offer
JOIN operator ON offer.operator_id = operator.id
WHERE offer.is_cancelled = false
  AND DATE(offer.created_at) = CURRENT_DATE
GROUP BY operator.id, operator.login, DATE(offer.created_at);
`;

const dailyAmount = async () => {
  try {
    const res = await knex.raw(dailyAmountQuery);
    return res.rows;
  } catch (e) {
    console.log("error from dailyAmount\t" + e.message);
    throw e;
  }
};
const selectByNameOperator = async (login) => {
  try {
    const res = await knex.raw(selectBy, [login]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByName\t" + e.message);
    throw e;
  }
};

const selectByIDOperator = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
    throw e;
  }
};

module.exports = { selectByIDOperator, selectByNameOperator, dailyAmount };
