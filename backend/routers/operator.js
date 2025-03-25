const express = require("express");

const auth = require("../middleware/auth");
const {
  loginCont,
  dailyAmountCont,
} = require("../controllers/operators/operator");

const router = express.Router();

router.get("/daily", dailyAmountCont);
router.post("/login", loginCont);

router.post("/add-some", auth, (req, res) => {
  res.status(200).json({ message: "its working" });
});
module.exports = router;
