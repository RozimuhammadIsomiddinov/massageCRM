require("dotenv").config();

const knex = require("knex")(require("../../knexfile"));
const bcrypt = require("bcryptjs");

const selectAllAdminQuery = `
      SELECT 
      a.id,
      a.login,
      b.name AS branch_name,
      a.role,
      a.password,
      a.created_at,
      a.updated_at
      FROM admin AS a 
      JOIN branch AS b ON a.branch_id = b.id;
      `;
const selectByIDQuery = `
        SELECT *FROM admin WHERE id = ?;
`;
const selectBy = `
        SELECT 
        a.id,
        a.login,
        b.name AS branch_name,
        a.role,
        a.password,
        a.created_at,
        a.updated_at
        FROM admin AS a 
        JOIN branch AS b ON a.branch_id = b.id
        WHERE login = ?
`;

const createadminQuery = `
        INSERT INTO admin (
        login ,
        password
        )
        VALUES(?,?)
        RETURNING *;
`;

const createOperatorQuery = `
    INSERT INTO operator(
    admin_id,
    branch_id,
    login,
    password
    )
    VALUES(?,?,?,?)
    RETURNING *;
`;

const archiveQuery = `
    SELECT
    offer.id,
    o.login,
    offer.is_cancelled AS status,
    DATE_TRUNC('month', offer.created_at) AS month,
    COALESCE(SUM(offer.cost) * 0.05, 0) AS income,
    COALESCE(
        SUM(EXTRACT(EPOCH FROM (offer.end_time - offer.start_time))), 
        0
    ) AS working_hours
FROM operator AS o
JOIN offer ON offer.operator_id = o.id
WHERE offer.start_time >= ?
  AND offer.end_time <= ?
  AND offer.created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND offer.created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
GROUP BY o.login, status, month, offer.id;

 `;

const statisticWorkerQuery = `
  SELECT 
    w.id AS worker_id,
    w.name AS worker_name,
    COUNT(o.id) AS shift_count, -- smenalar soni
    COUNT(CASE WHEN o.is_cancelled = true THEN 1 END) AS cancelled,
    COUNT(o.id) AS all_guest,
    COALESCE(SUM(o.cost), 0) - COALESCE(SUM(sp.total_cost), 0) AS profit,
    (COALESCE(SUM(o.cost), 0) - COALESCE(SUM(sp.total_cost), 0)) * 0.25 AS worker_part,
    COALESCE(SUM(o.cost), 0) AS income,
    COALESCE(
        SUM(EXTRACT(EPOCH FROM (o.end_time - o.start_time))), 
        0
    ) AS total_working_hours
FROM worker AS w
LEFT JOIN offer AS o ON o.worker_id = w.id
LEFT JOIN (
    SELECT worker_id, SUM(cost) AS total_cost
    FROM spend
    GROUP BY worker_id
) AS sp ON sp.worker_id = w.id
WHERE o.created_at >= ?  
  AND o.created_at <= ?
  AND o.is_cancelled = false
GROUP BY w.id, w.name
ORDER BY total_working_hours DESC;

`;

const selectOperatorAdminQuery = `
SELECT 
    o.id,
    o.login,
    b.name AS branch_name,
    town.name AS town_name,
    COALESCE(SUM(offer.end_time - offer.start_time), INTERVAL '0') AS working_time,
    COALESCE(SUM(offer.cost), 0) AS total_amount,
    COALESCE(SUM(offer.cost), 0) - COALESCE(SUM(spend.cost), 0) AS without_spend,
    COALESCE(SUM(offer.cost), 0) - COALESCE(SUM(spend.cost), 0) *0.31  AS payment,
    COALESCE(SUM(offer.cost), 0) + 0.05 AS cash,
    COALESCE(SUM(offer.cost), 0) + 0.05 - 0.05 AS result,
    COALESCE(SUM(offer.cost), 0) * 0.5 AS operator_part
FROM operator AS o
LEFT JOIN branch AS b ON o.branch_id = b.id
LEFT JOIN offer ON o.id = offer.operator_id
LEFT JOIN town ON town.id = o.town_id
LEFT JOIN spend ON spend.operator_id = o.id
GROUP BY o.id, o.login, b.name, town_name
ORDER BY o.id ASC;
`;

const selectOperatorAdmin = async () => {
  try {
    const res = await knex.raw(selectOperatorAdminQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectOperatorAdmin\t" + e.message);
    throw e;
  }
};
const selectAllAdmin = async () => {
  try {
    const res = await knex.raw(selectAllAdminQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectAllAdmin\t" + e.message);
    throw e;
  }
};
const archive = async (from, to) => {
  try {
    const res = await knex.raw(archiveQuery, [from, to]);
    return res.rows;
  } catch (e) {
    console.log("error from archive\t" + e.message);
    throw e;
  }
};

const statisticWorker = async (from, to) => {
  try {
    const res = await knex.raw(statisticWorkerQuery, [from, to]);
    return res.rows;
  } catch (e) {
    console.log("error from statisticWorker\t" + e.message);
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

const selectByID_admin = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
    throw e;
  }
};

const createAdmin = async () => {
  const { NAME, PASSWORD } = process.env;

  try {
    // Admin bor-yo'qligini tekshirish
    const checkAdmin = await knex.raw(selectBy, [NAME]);

    if (checkAdmin.rows.length > 0) {
      console.log("Admin allaqachon mavjud.");
      return;
    }

    // Agar admin mavjud bo'lmasa
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    await knex.raw(createadminQuery, [NAME, hashedPassword]);
  } catch (e) {
    console.log("Xatolik createAdmin: " + e.message);
    throw e;
  }
};

//create operator by admin
const createOperator = async (admin_id, branch_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await knex.raw(createOperatorQuery, [
      admin_id,
      branch_id,
      login,
      hashedPassword,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createOperator: " + e.message);
    throw e;
  }
};
/* createAdmin();
 */

module.exports = {
  selectOperatorAdmin,
  selectByName,
  selectByID_admin,
  createOperator,
  archive,
  statisticWorker,
  selectAllAdmin,
};
