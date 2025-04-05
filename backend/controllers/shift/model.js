require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const createShiftQuery = `
        INSERT INTO shift(
        shift_number,
        start_time,
        end_time,
        description
        )
        VALUES(?,?,?,?)
        RETURNING *;
`;

const updateShiftQuery = `
        UPDATE shift
            SET 
            shift_number = ?,
            start_time = ?,
            end_time = ?,
            description = ?
        WHERE id = ?
        RETURNING *;
`;
const selectShiftQuery = `
    SELECT *FROM shift;
`;

const selectShift = async () => {
  try {
    const res = await knex.raw(selectShiftQuery);
    return res.rows;
  } catch (e) {
    console.log("error from selectShift\t" + e.message);
    throw e;
  }
};
const createShift = async (shift_number, start_time, end_time, description) => {
  try {
    const res = await knex.raw(createShiftQuery, [
      shift_number,
      start_time,
      end_time,
      description,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from createShift\t" + e.message);
    throw e;
  }
};

const updateShift = async (
  id,
  shift_number,
  start_time,
  end_time,
  description
) => {
  try {
    const res = await knex.raw(updateShiftQuery, [
      shift_number,
      start_time,
      end_time,
      description,
      id,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from updateShift\t" + e.message);
    throw e;
  }
};

module.exports = { createShift, updateShift, selectShift };
