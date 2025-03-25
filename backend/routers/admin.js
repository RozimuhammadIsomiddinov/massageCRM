const express = require("express");
const { loginCont, createOperCont } = require("../controllers/admin/admin");
const auth = require("../middleware/auth");
const {
  createOperatorCont,
} = require("../controllers/super_admin/super_admin");

const router = express.Router();

router.post("/login", loginCont);
router.post("/add-operator", /*  auth, */ createOperatorCont);

module.exports = router;
