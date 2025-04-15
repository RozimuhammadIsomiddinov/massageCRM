require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectByIDQuery = `
        SELECT *FROM operator WHERE id = ?;
`;

const selectMainQuery = `
    SELECT 
    o.id,
    o.login,
    of.id AS offer_id,
    of.description,
    of.cost,
    of.prolongation,
    w.id AS worker_id,
    w.name AS worker_name,
    b.name AS branch_name,
    of.client_name,
    of.is_cancelled,
    of.cost * o.percent *0.01 AS operator_part,
    s.start_time,
    s.end_time
    FROM operator AS o
    LEFT JOIN worker AS w ON w.operator_id = o.id
    LEFT JOIN branch AS b ON b.id = o.branch_id
    LEFT JOIN offer AS of ON of.operator_id = o.id
    LEFT JOIN operator_shift AS os ON os.operator_id = o.id
    LEFT JOIN shift AS s ON s.id = os.shift_id
    ORDER BY of.id, w.id NULLS LAST;
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
//bu harkunlik
const dailyAmountQuery = `
 SELECT 
  operator.id AS operator_id,
  operator.login,
  DATE(offer.created_at) AS date,
  SUM(offer.cost) AS total_amount
FROM offer
LEFT JOIN operator ON offer.operator_id = operator.id
WHERE offer.is_cancelled = false
  AND DATE(offer.created_at) = CURRENT_DATE
GROUP BY operator.id, operator.login, DATE(offer.created_at);
`;

const twoWeaksQuery = `
  SELECT 
  operator.id AS operator_id,
  operator.login,
  SUM(offer.cost) AS total_amount
FROM offer
LEFT JOIN operator ON offer.operator_id = operator.id
WHERE offer.is_cancelled = false
  AND offer.created_at >= CURRENT_DATE - INTERVAL '14 days'
  AND operator.id = ?
GROUP BY operator.id, operator.login;
`;

const selectMain = async () => {
  try {
    const res = await knex.raw(selectMainQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectMain\t" + e.message);
    throw e;
  }
};
const dailyAmount = async () => {
  try {
    const res = await knex.raw(dailyAmountQuery);
    return res.rows;
  } catch (e) {
    console.log("error from dailyAmount\t" + e.message);
    throw e;
  }
};

const balanceOperator = async (id) => {
  try {
    const res = await knex.raw(twoWeaksQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from balanceOperator\t" + e.message);
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

module.exports = {
  selectMain,
  selectByIDOperator,
  selectByNameOperator,
  dailyAmount,
  balanceOperator,
};
