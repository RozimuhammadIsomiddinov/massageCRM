require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectByIDQuery = `
        SELECT *FROM operator WHERE id = ?;
`;

const selectBy = `
        SELECT *FROM operator WHERE login = ?;
`;

const selectByName = async (login) => {
  try {
    const res = await knex.raw(selectBy, [login]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByName\t" + e.message);
  }
};

const selectByIDOperator = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectByID" + e.message);
  }
};

module.exports = { selectByIDOperator, selectByName };
