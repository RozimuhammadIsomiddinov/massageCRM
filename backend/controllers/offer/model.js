require("dotenv").config();
const knex = require("knex")(require("../../knexfile"));

const selectOfferQuery = `
    SELECT *, COALESCE(cost, 0) * 3.5 AS name_percentage  
FROM offer  
WHERE operator_id = ?;

`;

const createOfferQuery = `
        INSERT INTO offer(
        start_time,
        end_time,
        cost,
        admin_id,
        worker_id,
        operator_id,
        client_name,
        description
        )
        VALUES (?,?,?,?,?,?,?,?)
        RETURNING *;
`;

//['1 hour', '1 hour', 3]
const updateIntervalQuery = `
    UPDATE offer 
    SET 
        prolongation = ?, 
        end_time = end_time + ?, 
        updated_at = NOW()
    WHERE id = ?
    RETURNING *;
`;

const deleteOfferQuery = `
    DELETE FROM offer WHERE id = ? RETURNING*;
`;
const createOffer = async (
  start_time,
  end_time,
  cost,
  admin_id,
  worker_id,
  operator_id,
  client_name,
  description
) => {
  try {
    const res = await knex.raw(createOfferQuery, [
      start_time,
      end_time,
      cost,
      admin_id,
      worker_id,
      operator_id,
      client_name,
      description,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from createOffer\t" + e.message);
    throw e;
  }
};

const updateOffer = async (id, prolongation) => {
  try {
    const res = await knex.raw(updateIntervalQuery, [
      prolongation,
      prolongation,
      id,
    ]);
    return res.rows;
  } catch (e) {
    console.log("error from updateOfferQuery\t" + e.message);
    throw e;
  }
};
const deleteOffer = async (id) => {
  try {
    const res = await knex.raw(deleteOfferQuery, [id]);
    return res.rows;
  } catch (e) {
    console.log("error from deleteOffer\t" + e.message);
    throw e;
  }
};
module.exports = {
  createOffer,
  updateOffer,
  deleteOffer,
};
