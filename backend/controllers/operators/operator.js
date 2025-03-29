const { compare } = require("bcryptjs");
const { selectByNameOperator, dailyAmount } = require("./model");
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
module.exports = { loginCont, dailyAmountCont };
