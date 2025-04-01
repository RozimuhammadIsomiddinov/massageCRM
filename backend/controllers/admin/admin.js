const { compare } = require("bcryptjs");

const { selectByName, archive, statisticWorker } = require("./model");
const { generateJWT } = require("../../config/functions");
const { selectByLogin } = require("../super_admin/model");
const { selectByNameOperator } = require("../operators/model");

const loginCont = async (req, res) => {
  const { login, password } = req.body;
  try {
    const result1 = await selectByName(login);
    if (result1.length == 0)
      return res.status(404).json({ message: "admin not found" });

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

const allLoginCont = async (req, res) => {
  const { login, password } = req.body;
  try {
    const result1 = await selectByLogin(login); //super_admin
    const result2 = await selectByName(login); //admin
    const result3 = await selectByNameOperator(login); //operator

    const user = result1[0] || result2[0] || result3[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "parol is incorrect" });
    }
    const token = generateJWT(user);
    return res.status(200).json({ token, result: user });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from allLoginCont", error: e.message });
  }
};

const archiveCont = async (req, res) => {
  const { from, to } = req.query;
  try {
    const result = await archive(from, to);
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from archiveCont", error: e.message });
  }
};

const statisticWorkerCont = async (req, res) => {
  const { from, to } = req.query;

  try {
    const result = await statisticWorker(from, to);
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from statisticWorkerCont", error: e.message });
  }
};

module.exports = { loginCont, allLoginCont, archiveCont, statisticWorkerCont };
