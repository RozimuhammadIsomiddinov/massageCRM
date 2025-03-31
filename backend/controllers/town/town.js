const {
  selectAll,
  selectByID_town,
  createtown,
  updatetown,
  deletetown,
} = require("./model");

const getAlltown = async (req, res) => {
  try {
    const result = await selectAll();
    if (!result) return res.status(404).json({ message: "town hasn't yet" });

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getByIDtown = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result = await selectByID_town(id);
    /* if (result.length == 0)
      return res.status(404).json({ message: `${id} hasn't yet` });
 */
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createtownCont = async (req, res) => {
  const { name, branch_id } = req.body;

  if (!name || !branch_id)
    return res.status(400).json({ message: "fill all fields" });
  try {
    /*  const result1 = await selectByID(super_id);
    if (!result1)
      return res.status(400).json({ message: "super_admin not found" });
 */
    const result = await createtown(name, branch_id);
    if (!result) return res.status(404).json({ message: "not saved" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updatetownCont = async (req, res) => {
  const { id } = req.params;
  const { name, branch_id } = req.body;
  if (!name || !id) return res.status(400).json({ message: "fill all fields" });

  try {
    const result1 = await selectByID_town(id);
    if (result1.length == 0)
      return res.status(404).json({ message: "NOT FOUND" });

    const result = await updatetown(id, branch_id, name);
    if (result.length == 0)
      return res.status(404).json({ message: "not updated" });

    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deletetownCont = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "send an id" });
  try {
    const result1 = await selectByID_town(id);
    if (result1.length == 0)
      return res.status(404).json({ message: "NOT FOUND" });

    await deletetown(id);
    return res.status(200).json({ message: "succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAlltown,
  getByIDtown,
  createtownCont,
  updatetownCont,
  deletetownCont,
};
