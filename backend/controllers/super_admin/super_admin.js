const { compare } = require("bcryptjs");
const {
  selectByLogin,
  createAdmin,
  createOperator,
  updateOperator,
  updateAdmin,
  selectOperator,
  selectAdminFilter,
  selectOperatorFilter,
} = require("./model");
const { generateJWT } = require("../../config/functions");
const { selectByID_branch } = require("../branch/model");
const { selectByID_admin } = require("../admin/model");

const loginCont = async (req, res) => {
  const { login, password } = req.body;
  try {
    const result1 = await selectByLogin(login);
    if (result1.length == 0)
      return res.status(404).json({ message: "super_admin not found" });

    const isMatch = await compare(password, result1[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "parol is incorrect" });
    }

    const token = generateJWT(result1[0]);
    res.status(200).json({
      token,
      result: result1[0],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const selectAdminFilterCont = async (req, res) => {
  const { from, to } = req.body;
  try {
    const result = await selectAdminFilter(from, to);
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
const createAdminCont = async (req, res) => {
  const { branch_id, login, password } = req.body;
  if (!branch_id || !login || !password)
    return res.status(400).json({ message: "fill all fields" });
  try {
    const result1 = await selectByID_branch(branch_id);
    if (!result1)
      return res.status(400).json({ message: "incorrect branch_id" });

    const result = await createAdmin(branch_id, login, password);

    if (!result) return res.status(404).json({ message: "unsuccesfully" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateAdminCont = async (req, res) => {
  const { id } = req.params;
  const { branch_id, login, password } = req.body;
  try {
    const result = await updateAdmin(id, branch_id, login, password);
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const selectOperatorCont = async (req, res) => {
  try {
    const result = await selectOperator();
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const selectOperatorFilterCont = async (req, res) => {
  const { from, to } = req.body;
  try {
    const result = await selectOperatorFilter(from, to);
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createOperatorCont = async (req, res) => {
  const { branch_id, admin_id, login, password } = req.body;
  if (!branch_id || !login || !password || !admin_id)
    return res.status(400).json({ message: "fill all fields" });

  try {
    const result1 = await selectByID_branch(branch_id);
    const result2 = await selectByID_admin(admin_id);
    if (!result1)
      return res.status(400).json({ message: "incorrect branch_id" });
    if (!result2)
      return res.status(400).json({ message: "incorrect admin_id" });

    const result = await createOperator(branch_id, admin_id, login, password);

    if (!result) return res.status(404).json({ message: "unsuccesfully" });

    return res.status(201).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateOperatorCont = async (req, res) => {
  const { id } = req.params;
  const { branch_id, login, password } = req.body;
  if (!branch_id || !login || !password)
    return res.status(400).json({ message: "fill all fields" });
  try {
    const result = await updateOperator(id, branch_id, login, password);
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = {
  loginCont,
  selectAdminFilterCont,
  createAdminCont,
  updateAdminCont,
  selectOperatorCont,
  selectOperatorFilterCont,
  createOperatorCont,
  updateOperatorCont,
};
