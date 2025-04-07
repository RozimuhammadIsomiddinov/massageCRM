const { compare } = require("bcryptjs");
const {
  selectByNameOperator,
  dailyAmount,
  balanceOperator,
  selectMain,
} = require("./model");
const { generateJWT } = require("../../config/functions");

const loginCont = async (req, res) => {
  const { login, password } = req.body;
  try {
    const result = await selectByNameOperator(login);
    if (result.length == 0)
      return res.status(404).json({ message: "admin not found" });

    const isMatch = await compare(password, result[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "parol is incorrect" });
    }

    const token = generateJWT(result[0]);
    res.status(200).json({
      token,
      result: result[0],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const selectMainCont = async (req, res) => {
  try {
    const result = await selectMain();
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from selectMainCont", error: e.message });
  }
};
const dailyAmountCont = async (req, res) => {
  try {
    const result = await dailyAmount();
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from dailyAmountCont", error: e.message });
  }
};

const balanceOperatorCont = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await balanceOperator(id);
    return res.status(200).json(result);
  } catch (e) {
    res
      .status(500)
      .json({ message: "error from balanceOperatorCont", error: e.message });
  }
};
module.exports = {
  selectMainCont,
  loginCont,
  dailyAmountCont,
  balanceOperatorCont,
};
