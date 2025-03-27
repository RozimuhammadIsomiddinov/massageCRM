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

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getByIDBranch = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result = await selectByID_branch(id);
    /* if (result.length == 0)
      return res.status(404).json({ message: `${id} hasn't yet` });
 */
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createBranchCont = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "fill brach_name" });
  try {
    /*  const result1 = await selectByID(super_id);
    if (!result1)
      return res.status(400).json({ message: "super_admin not found" });
 */
    const result = await createBranch(name);
    if (!result) return res.status(404).json({ message: "not saved" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateBranchCont = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name || !id) return res.status(400).json({ message: "fill all fields" });

  try {
    const result1 = await selectByID_branch(id);
    if (result1.length == 0)
      return res.status(404).json({ message: "NOT FOUND" });

    const result = await updateBranch(id, name);
    if (result.length == 0)
      return res.status(404).json({ message: "not updated" });

    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteBranchCont = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result1 = await selectByID_branch(id);
    if (result1.length == 0)
      return res.status(404).json({ message: "NOT FOUND" });

    await deleteBranch(id);
    return res.status(200).json({ message: "succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllBranch,
  getByIDBranch,
  createBranchCont,
  updateBranchCont,
  deleteBranchCont,
};
