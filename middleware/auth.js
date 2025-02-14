require("dotenv").config();
const jwt = require("jsonwebtoken");
const { selectByID } = require("../controllers/admin/model");
const { selectByIDOperator } = require("../controllers/operators/model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // bearer token
  if (!token) {
    return res.status(401).json({ error: "please send a token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let admin = await selectByID(decoded.id);
    if (!admin) {
      // Agar admin topilmasa operatorni tekshirish
      admin = await selectByIDOperator(decoded.id);
    }

    if (!admin) {
      return res.status(401).json({ error: "User not found" });
    }

    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
