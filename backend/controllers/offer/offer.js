const { createOffer, deleteOffer, updateOffer } = require("./model");

const createOfferCont = async (req, res) => {
  const {
    start_time,
    end_time,
    cost,
    admin_id,
    worker_id,
    town_id,
    operator_id,
    client_name,
    description,
  } = req.body;

  try {
    const result = await createOffer(
      start_time,
      end_time,
      cost,
      admin_id,
      worker_id,
      town_id,
      operator_id,
      client_name,
      description
    );
    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createOfferCont", error: e.message });
  }
};

const updateOfferCont = async (req, res) => {
  const { id } = req.params;
  const { prolongation } = req.query;
  try {
    const result = await updateOffer(id, prolongation);
    return res.status(200).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from updateOfferCont", error: e.message });
  }
};
const deleteOfferCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOffer(id);
    if (result.length == 0)
      return res.status(404).json({ message: "already deleted" });

    return res.status(200).json({ message: "deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from deleteOfferCont", error: e.message });
  }
};
module.exports = { createOfferCont, deleteOfferCont, updateOfferCont };
