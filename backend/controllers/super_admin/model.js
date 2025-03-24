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

const createAdminQuery = `
        INSERT INTO admin (
        branch_id ,
        login ,
        password
        )
        VALUES(?,?,?)
        RETURNING *;
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

const selectByID = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
  }
};

const selectByLogin = async (login) => {
  try {
    const res = await knex.raw(selectBy, [login]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByLogin" + e.message);
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
  }
};

createSuperAdmin();

module.exports = {
  selectByID,
  selectByLogin,
  createAdmin,
  createOperator,
};
