require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectAllWorkerQuery = `
    SELECT 
    w.id,
    town.name AS town_name,
    branch.name AS branch_name,
    operator.login AS operator_name,
    w.percent,
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
            percent,
            created_at
        )
        VALUES(?,?,?,?,?,NOW())
        RETURNING *;
`;

const updateWorkerQuery = `
    UPDATE worker 
        SET 
          branch_id = ?,
          operator_id = ?,
          town_id = ?,
          name = ?,
          percent = ?,
          updated_at = NOW()
    WHERE id = ?
    RETURNING *;
`;
const deleteWorkerQuery = `
    DELETE FROM worker WHERE id = ? RETURNING *;
`;

const resultWorkQuery = `
      SELECT
      o.id AS offer_id,
      o.start_time,
      o.end_time,
      o.cost,
      admin.login AS admin_name,
      o.admin_id,
      o.operator_id,
      operator.login AS operator_name,
      o.client_name,
      o.is_cancelled,
      o.prolongation,
      o.created_at,
      o.town_id,
      town.name AS town_name
    FROM offer AS o
    LEFT JOIN admin ON admin.id = o.admin_id
    LEFT JOIN operator ON operator.id = o.operator_id
    LEFT JOIN town ON town.id = o.town_id
    WHERE worker_id = ?;
`;

const percentResultQUery = `
INSERT INTO result(
    admin_id,
    worker_id,
    town_id,
    operator_id,
    offer_id,
    cost,
    percent_worker,
    description
)
VALUES (?,?,?,?,?,?,?,?)
RETURNING *;

`;

const selectResultQuery = `
    SELECT 
    r.id AS result_id,
    r.cost,
    r.percent_worker,
    r.description,
    admin.login AS admin_name,
    operator.login AS operator_name,
    worker.name AS worker_name,
    town.name AS town_name,
    r.offer_id
    FROM result AS r 
    JOIN admin ON admin.id = r.admin_id
    JOIN operator ON operator.id = r.operator_id
    JOIN worker ON worker.id = r.worker_id
    JOIN town ON town.id = r.town_id;
    ;
`;
const selectResult = async () => {
  try {
    const res = await knex.raw(selectResultQuery);
    return res.rows;
  } catch (error) {
    console.error("Error fetching selectResult:", error);
    throw error;
  }
};
const resultWork = async (workerId) => {
  try {
    const res = await knex.raw(resultWorkQuery, [workerId]);
    return res.rows;
  } catch (error) {
    console.error("Error fetching resultWork:", error);
    throw error;
  }
};
const percentResult = async (data) => {
  const {
    admin_id,
    worker_id,
    town_id,
    offer_id,
    operator_id,
    cost,
    percent_worker,
    description,
  } = data;

  const percent_1 = cost * percent_worker * 0.01;

  try {
    const res = await knex.raw(percentResultQUery, [
      admin_id,
      worker_id,
      town_id,
      operator_id,
      offer_id,
      percent_1,
      percent_worker, // percent_worker ustuniga
      description || "",
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error inserting percentResult:", error);
    throw error;
  }
};
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
      data.percent,
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
      data.percent,
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
module.exports = {
  percentResult,
  selectResult,
  resultWork,
  selectAllWorker,
  createWorker,
  updateWorker,
  deleteWorker,
};
