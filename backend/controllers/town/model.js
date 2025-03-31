require("dotenv").config();

const knex = require("knex")(require("../../knexfile"));

const selectAllQuery = `
        SELECT *FROM town;
`;

const selectByIDQuery = `
        SELECT *FROM town WHERE id = ?;
`;

const createtownQuery = `
        INSERT INTO town(
        name,
        branch_id
        )
        VALUES (?,?)
        RETURNING *;
`;

const updatetownQuery = ` 
        UPDATE  town
            SET 
                name = ?,
                branch_id = ?,
                updated_at = NOW()
            WHERE id = ?
            RETURNING *;
`;

const deletetownQuery = `
        DELETE FROM town WHERE id = ?;
`;

const selectAll = async () => {
  try {
    const res = await knex.raw(selectAllQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectALl" + e.message);
    throw e;
  }
};

const selectByID_town = async (id) => {
  try {
    const res = await knex.raw(selectByIDQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectById" + e.message);
    throw e;
  }
};

const createtown = async (name, branch_id) => {
  try {
    const res = await knex.raw(createtownQuery, [name, branch_id]);
    return res.rows;
  } catch (e) {
    console.log("Xatolik createtown: " + e.message);
    throw e;
  }
};

const updatetown = async (id, branch_id, name) => {
  try {
    const res = await knex.raw(updatetownQuery, [name, branch_id, id]);
    return res.rows;
  } catch (e) {
    console.log("error from updatetown" + e.message);
    throw e;
  }
};

const deletetown = async (id) => {
  try {
    const res = await knex.raw(deletetownQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from deletetown" + e.message);
    throw e;
  }
};

module.exports = {
  selectAll,
  selectByID_town,
  createtown,
  updatetown,
  deletetown,
};
