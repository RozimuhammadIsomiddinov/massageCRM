require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectByIDQuery = `
        SELECT *FROM operator WHERE id = ?;
`;

const selectBy = `
        SELECT *FROM operator WHERE login = ?;
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
const selectByName = async (login) => {
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

module.exports = { selectByIDOperator, selectByName, dailyAmount };
