const { createSpend, filterSpend } = require("./model");

const filterSpendCont = async (req, res) => {
  const { from, to } = req.query;
  try {
    const result = await filterSpend(from, to);
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from filterSpendCont", error: e.message });
  }
};
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

module.exports = { createSpendCont, filterSpendCont };
