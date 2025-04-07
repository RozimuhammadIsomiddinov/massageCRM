require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectAllWorkerQuery = `
    SELECT 
    w.id,
    town.name AS town_name,
    branch.name AS branch_name,
    operator.login AS operator_name,
    w.name
    FROM worker AS w
    JOIN town ON town.id = w.town_id
    JOIN branch ON branch.id = w.branch_id
    JOIN operator ON operator.id = w.operator_id
    GROUP BY w.id, town_name, branch_name, operator_name, w.name;
`;

//kunlik pulni olish ishchi uchun
const dailyAmountWorkerQuery = `
SELECT 
  operator.id AS operator_id,
  operator.login,
  worker.name AS worker_name,
  town.name AS town_name,
  DATE(offer.created_at) AS date,
  SUM(offer.cost) AS total_amount
FROM offer
JOIN operator ON offer.operator_id = operator.id
JOIN worker ON offer.worker_id = worker.id
JOIN town ON offer.town_id = town.id
WHERE offer.is_cancelled = false
  AND DATE(offer.created_at) = CURRENT_DATE
GROUP BY operator.id, operator.login,town.name, worker.name, DATE(offer.created_at);
`;

const createWorkerQuery = `
        INSERT INTO worker(
            branch_id,
            operator_id,
            town_id,
            name,
            created_at
        )
        VALUES(?,?,?,?,NOW())
        RETURNING *;
`;

const updateWorkerQuery = `
    UPDATE worker 
        SET 
          branch_id = ?,
          operator_id = ?,
          town_id = ?,
          name = ?,
          updated_at = NOW()
    WHERE id = ?
    RETURNING *;
`;
const deleteWorkerQuery = `
    DELETE FROM worker WHERE id = ? RETURNING *;
`;

const selectAllWorker = async () => {
  try {
    const res = await knex.raw(selectAllWorkerQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectAllWorker\t" + e.message);
    throw e;
  }
};
const createWorker = async (data) => {
  try {
    const res = await knex.raw(createWorkerQuery, [
      data.branch_id,
      data.operator_id,
      data.town_id,
      data.name,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from createWorker\t" + e.message);
    throw e;
  }
};

const updateWorker = async (data, id) => {
  try {
    const res = await knex.raw(updateWorkerQuery, [
      data.branch_id,
      data.operator_id,
      data.town_id,
      data.name,
      id,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from updateWorker\t" + e.message);
    throw e;
  }
};

const deleteWorker = async (id) => {
  try {
    const res = await knex.raw(deleteWorkerQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from deleteWorker\t" + e.message);
    throw e;
  }
};
module.exports = { selectAllWorker, createWorker, updateWorker, deleteWorker };
