require("dotenv").config();

const knex = require("knex")(require("../../knexfile"));
const bcrypt = require("bcryptjs");

const selectByIDQuery = `
        SELECT *FROM admin WHERE id = ?;
`;
const selectBy = `
        SELECT *FROM admin WHERE login = ?;
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
    login,
    password
    )
    VALUES(?,?,?)
    RETURNING *;
`;

const selectByName = async (login) => {
  try {
    const res = await knex.raw(selectBy, [login]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByName\t" + e.message);
  }
};

const selectByID_admin = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
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
  }
};

//create operator by admin
const createOperator = async (admin_id, login, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await knex.raw(createOperatorQuery, [
      admin_id,
      login,
      hashedPassword,
    ]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createOperator: " + e.message);
  }
};
/* createAdmin();
 */
module.exports = { selectByName, selectByID_admin, createOperator };
