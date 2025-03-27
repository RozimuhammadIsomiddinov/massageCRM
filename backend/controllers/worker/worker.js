const { selectByID_branch } = require("../branch/model");
const { selectByIDOperator } = require("../operators/model");
const { createWorker, updateWorker, deleteWorker } = require("./model");

const createWorkerCont = async (req, res) => {
  const { branch_id, operator_id, name } = req.body;

  if (!branch_id || !operator_id || !name) {
    return res.status(400).json({ message: "fill all fields" });
  }

  try {
    const result1 = await selectByID_branch(branch_id);
    if (result1.length == 0)
      return res.status(404).json({ message: "branch not found" });

    const result2 = await selectByIDOperator(operator_id);
    if (result2.length == 0)
      return res.status(404).json({ message: "operator not found" });

    const result = await createWorker({ branch_id, operator_id, name });
    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createWorkerCont", error: e.message });
  }
};

const updateWorkerCont = async (req, res) => {
  const { id } = req.params;
  const { branch_id, operator_id, name } = req.body;

  if (!branch_id || !operator_id || !name) {
    return res.status(400).json({ message: "fill all fields" });
  }

  try {
    const result1 = await selectByID_branch(branch_id);
    if (result1.length == 0)
      return res.status(404).json({ message: "branch not found" });

    const result2 = await selectByIDOperator(operator_id);
    if (result2.length == 0)
      return res.status(404).json({ message: "operator not found" });

    const result = await updateWorker({ branch_id, operator_id, name }, id);
    return res.status(200).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from updateWorkerCont", error: e.message });
  }
};

const deleteWorkerCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteWorker(id);
    if (result.length == 0)
      return res.status(404).json({ message: "already deleted" });

    return res.status(200).json({ message: "deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from deleteWorkerCont", error: e.message });
  }
};
module.exports = { createWorkerCont, updateWorkerCont, deleteWorkerCont };
