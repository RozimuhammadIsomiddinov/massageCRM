const express = require("express");
const {
  createOperatorCont,
  createAdminCont,
  updateOperatorCont,
  updateAdminCont,
  selectOperatorCont,
  selectAdminFilterCont,
  selectOperatorFilterCont,
} = require("../controllers/super_admin/super_admin");
const router = express.Router();

router.get("/operator", selectOperatorCont);

router.post("/admin-filter", selectAdminFilterCont);
router.post("/operator-filter", selectOperatorFilterCont);

router.post("/create-admin", createAdminCont);
router.post("/create-operator", createOperatorCont);

router.put("/update-admin/:id", updateAdminCont);
router.put("/update-operator/:id", updateOperatorCont);

module.exports = router;
