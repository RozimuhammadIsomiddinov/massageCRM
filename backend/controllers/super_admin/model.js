require("dotenv").config();

const knex = require("knex")(require("../../knexfile"));
const bcrypt = require("bcryptjs");

const selectByIDQuery = `
        SELECT *FROM super_admin WHERE id = ?;
`;

const selectBy = `
        SELECT *FROM super_admin WHERE login = ?;
`;

//only once time
const createSuperAdminQuery = `
        INSERT INTO super_admin (
        login ,
        password
        )
        VALUES(?,?)
        RETURNING *;
`;
const selectAdminFilterQuery = `
      SELECT 
        a.id,
        a.login,
        branch.name AS branch_name,
        COALESCE(SUM(offer.end_time - offer.start_time), INTERVAL '0') AS working_time,
        COALESCE(SUM(offer.cost), 0) AS total_amount,
        COALESCE(SUM(offer.cost), 0) * 0.35 AS admin_part
    FROM admin AS a
    JOIN branch ON a.branch_id = branch.id
    LEFT JOIN offer ON a.id = offer.admin_id
    AND offer.created_at >= ? AND offer.created_at <= ?   
     GROUP BY a.id, a.login, branch.name;
`;
const createAdminQuery = `
        INSERT INTO admin (
        branch_id ,
        login ,
        password
        )
        VALUES(?,?,?)
        RETURNING *;
`;
const updateAdminQuery = `
        UPDATE admin
          SET 
            branch_id = ?,
            login = ?,
            password = ?,
            updated_at = NOW()
        WHERE id = ?
        RETURNING *;
`;

const selectOperatorQuery = `
    SELECT 
    o.id,
    o.login,
    o.role,
    branch.name AS branch_name
    FROM operator AS o 
    JOIN branch ON o.branch_id = branch.id;
`;

const selectOperatorFilterQuery = `
  SELECT 
    o.id,
    o.login,
    b.name AS branch_name,
    COALESCE(SUM(offer.end_time - offer.start_time), INTERVAL '0') AS working_time,
    COALESCE(SUM(offer.cost), 0) AS total_amount,
    COALESCE(SUM(offer.cost), 0) * 0.5 AS operator_part
FROM operator AS o
LEFT JOIN branch AS b ON o.branch_id = b.id
LEFT JOIN offer ON o.id = offer.operator_id
    AND offer.created_at >= ? AND offer.created_at <= ?
GROUP BY o.id, o.login, b.name 
ORDER BY o.id ASC;
`;
const createOperatorQuery = `
    INSERT INTO operator(
    branch_id,
    admin_id,
    login,
    password
    )
    VALUES(?,?,?,?)
    RETURNING *;
`;
//update from super_admin
const updateOperatorQuery = `
    UPDATE operator
      SET 
      branch_id = ?,
      login = ?,
      password = ?,
      updated_at = NOW()
    WHERE id = ?
    RETURNING *;
`;

const selectByID = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
    throw e;
  }
};

const selectByLogin = async (login) => {
  try {
    const res = await knex.raw(selectBy, [login]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByLogin" + e.message);
    throw e;
  }
};

const selectOperator = async () => {
  try {
    const res = await knex.raw(selectOperatorQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectOperator" + e.message);
    throw e;
  }
};

const selectOperatorFilter = async (from, to) => {
  try {
    const res = await knex.raw(selectOperatorFilterQuery, [from, to]);
    return res.rows;
  } catch (e) {
    console.log("error from selectOperatorFilter" + e.message);
    throw e;
  }
};
const selectAdminFilter = async (from, to) => {
  try {
    const res = await knex.raw(selectAdminFilterQuery, [from, to]);
    return res.rows;
  } catch (e) {
    console.log("error from selectAdminFilter" + e.message);
    throw e;
  }
};

const createAdmin = async (branch_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await knex.raw(createAdminQuery, [
      branch_id,
      login,
      hashedPassword,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createAdmin: " + e.message);
    throw e;
  }
};

const updateAdmin = async (id, brach_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await knex.raw(updateAdminQuery, [
      brach_id,
      login,
      hashedPassword,
      id,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik updateAdmin: " + e.message);
    throw e;
  }
};
const createOperator = async (branch_id, admin_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await knex.raw(createOperatorQuery, [
      branch_id,
      admin_id,
      login,
      hashedPassword,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createOperator: " + e.message);
    throw e;
  }
};
const updateOperator = async (id, branch_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await knex.raw(updateOperatorQuery, [
      branch_id,
      login,
      hashedPassword,
      id,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createOperator: " + e.message);
    throw e;
  }
};

const createSuperAdmin = async () => {
  const { NAME, PASSWORD } = process.env;

  try {
    // Admin bor-yo'qligini tekshirish
    const checkAdmin = await knex.raw(selectBy, [NAME]);

    if (checkAdmin.rows.length > 0) {
      console.log("SuperAdmin allaqachon mavjud.");
      return;
    }

    // Agar admin mavjud bo'lmasa
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    await knex.raw(createSuperAdminQuery, [NAME, hashedPassword]);
  } catch (e) {
    console.log("Xatolik createSuperAdmin: " + e.message);
    throw e;
  }
};

createSuperAdmin();

module.exports = {
  selectByID,
  selectByLogin,
  selectAdminFilter,
  createAdmin,
  updateAdmin,
  selectOperator,
  selectOperatorFilter,
  createOperator,
  updateOperator,
};
