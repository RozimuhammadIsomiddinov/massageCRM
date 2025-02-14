const express = require("express");

const auth = require("../middleware/auth");
const { loginCont } = require("../controllers/operators/operator");

const router = express.Router();

router.post("/login", loginCont);
router.post("/add-some", auth, (req, res) => {
  res.status(200).json({ message: "its working" });
});
module.exports = router;
