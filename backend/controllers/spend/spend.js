const { createSpend } = require("./model");

const createSpendCont = async (req, res) => {
  const { admin_id, worker_id, town_id, operator_id, cost, category } =
    req.body;
  try {
    const result = await createSpend(
      admin_id,
      worker_id,
      town_id,
      operator_id,
      cost,
      category
    );
    return res.status(201).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createShiftCont", error: e.message });
  }
};

module.exports = { createSpendCont };
