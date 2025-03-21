const { selectByID } = require("../super_admin/model");
const {
  selectAll,
  selectByID_branch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("./model");

const getAllBranch = async (req, res) => {
  try {
    const result = await selectAll();
    if (!result) return res.status(404).json({ message: "branch hasn't yet" });

    return res.status(200).json({ result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getByIDBranch = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result = await selectByID_branch(id);
    if (!result) return res.status(404).json({ message: `${id} hasn't yet` });

    return res.status(200).json({ result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const postBranchCont = async (req, res) => {
  const { name, super_id } = req.body;

  if (!name || !super_id)
    return res.status(400).json({ message: "fill all fields" });
  try {
    const result1 = await selectByID(super_id);
    if (!result1)
      return res.status(400).json({ message: "super_admin not found" });

    const result = await createBranch(name);
    if (!result) return res.status(404).json({ message: "not saved" });

    return res.status(201).json({ message: "successfully", result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const putBranchCont = async (req, res) => {
  const { name, super_id } = req.body;
  if (!name || !super_id)
    return res.status(400).json({ message: "fill all fields" });

  try {
    const result1 = await selectByID(super_id);
    if (!result1)
      return res.status(400).json({ message: "super_admin not found" });

    const result = await updateBranch(name);
    if (!result) return res.status(404).json({ message: "not updated" });

    return res.status(201).json({ message: "successfully", result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteBranchCont = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result1 = await selectByID_branch(id);
    if (!result1) return res.status(404).json({ message: "already deleted" });

    const result = await deleteBranch(id);
    return res.status(200).json({ message: "succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllBranch,
  getByIDBranch,
  postBranchCont,
  putBranchCont,
  deleteBranchCont,
};
