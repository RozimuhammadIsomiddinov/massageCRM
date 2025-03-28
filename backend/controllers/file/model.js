require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectFileQuery = `
    SELECT file, created_at, updated_at FROM file WHERE id = ?;
`;
const createFileQuery = `
    INSERT INTO file(
    offer_id,
    file
    )
    VALUES (?,?)
    RETURNING *;
`;

const updateFileQUery = `
        UPDATE file
        SET
            file = ?,
            updated_at = NOW()
        WHERE id = ?
        RETURNING *;
`;

const selectFile = async (id) => {
  try {
    const res = await knex.raw(selectFileQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from selectFile\t" + e.message);
    throw e;
  }
};

const createFile = async (offer_id, file) => {
  try {
    const res = await knex.raw(createFileQuery, [offer_id, file]);

    return res.rows;
  } catch (e) {
    console.log("error from createFile\t" + e.message);
    throw e;
  }
};

const updateFile = async (id, file) => {
  try {
    const res = await knex.raw(updateFileQUery, [file, id]);
    return res.rows;
  } catch (e) {
    console.log("error from updateFile\t" + e.message);
    throw e;
  }
};

module.exports = { selectFile, createFile, updateFile };
