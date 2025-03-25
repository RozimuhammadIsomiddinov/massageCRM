const { createWorker, updateWorker, deleteWorker } = require("./model");

const createWorkerCont = async (req, res) => {
  try {
    const result = await createWorker(req.body);
    return res.status(201).json(result[0]);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from createWorkerCont", error: e.message });
  }
};
const updateWorkerCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateWorker(req.body, id);
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
