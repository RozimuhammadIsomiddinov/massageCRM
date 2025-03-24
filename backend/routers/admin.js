const express = require("express");
const { loginCont, createOper } = require("../controllers/admin/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginCont);
router.post("/add-operator", auth, createOper);

module.exports = router;
