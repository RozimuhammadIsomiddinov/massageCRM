const { selectByID_branch } = require("../branch/model");
const { selectByIDOperator } = require("../operators/model");
const {
  createWorker,
  updateWorker,
  deleteWorker,
  selectAllWorker,
  resultWork,
  percentResult,
  selectResult,
} = require("./model");

const selectResultCont = async (req, res) => {
  try {
    const result = await selectResult();
    return res.status(200).json(result);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "error from selectResultCont", error: e.message });
  }
};
const resultWorkCont = async (req, res) => {
  const { worker_id } = req.params;

  if (!worker_id) {
    return res.status(400).json({ message: "worker_id is required" });
  }

  try {
    const result = await resultWork(worker_id);
    return res.status(200).json(result);
  } catch (e) {
    console.error("Error from resultWorkCont:", e.message);
    return res
      .status(500)
      .json({ message: "error from resultWorkCont", error: e.message });
  }
};

const percentResultCont = async (req, res) => {
  const {
    admin_id,
    worker_id,
    town_id,
    offer_id,
    operator_id,
    cost,
    percent_worker,
    description,
  } = req.body;

  if (
    !admin_id ||
    !worker_id ||
    !town_id ||
    !offer_id ||
    !operator_id ||
    !cost ||
    !percent_worker
  ) {
    return res.status(400).json({ message: "fill all required fields" });
  }

  try {
    const result = await percentResult({
      admin_id,
      worker_id,
      town_id,
      offer_id,
      operator_id,
      cost,
      percent_worker,
      description: description || "",
    });
    return res.status(201).json(result);
  } catch (e) {
    console.error("Error from percentResultCont:", e.message);
    return res
      .status(500)
      .json({ message: "error from percentResultCont", error: e.message });
  }
};
const selectAllWorkerCont = async (req, res) => {
  try {
    const result = await selectAllWorker();
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from selectAllWorkerCont", error: e.message });
  }
};
const createWorkerCont = async (req, res) => {
  const { branch_id, percent, operator_id, town_id, name } = req.body;

  if (!branch_id || !operator_id || !town_id || !name || !percent) {
    return res.status(400).json({ message: "fill all fields" });
  }

  try {
    const result1 = await selectByID_branch(branch_id);
    if (result1.length == 0)
      return res.status(404).json({ message: "branch not found" });

    const result2 = await selectByIDOperator(operator_id);
    if (result2.length == 0)
      return res.status(404).json({ message: "operator not found" });

    const result = await createWorker({
      branch_id,
      operator_id,
      town_id,
      percent,
      name,
    });
    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createWorkerCont", error: e.message });
  }
};

const updateWorkerCont = async (req, res) => {
  const { id } = req.params;
  const { branch_id, percent, operator_id, name, town_id } = req.body;

  if (!branch_id || !operator_id || !name || !town_id || !percent) {
    return res.status(400).json({ message: "fill all fields" });
  }

  try {
    const result1 = await selectByID_branch(branch_id);
    if (result1.length == 0)
      return res.status(404).json({ message: "branch not found" });

    const result2 = await selectByIDOperator(operator_id);
    if (result2.length == 0)
      return res.status(404).json({ message: "operator not found" });

    const result = await updateWorker(
      { branch_id, operator_id, percent, name, town_id },
      id
    );
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
module.exports = {
  selectAllWorkerCont,
  createWorkerCont,
  percentResultCont,
  selectResultCont,
  resultWorkCont,
  updateWorkerCont,
  deleteWorkerCont,
};
