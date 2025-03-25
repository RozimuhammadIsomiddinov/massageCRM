const { compare } = require("bcryptjs");

const { selectByName } = require("./model");
const { generateJWT } = require("../../config/functions");

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
      admin_name: result1[0].login,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { loginCont };
