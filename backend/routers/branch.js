const express = require("express");
const {
  getAllBranch,
  getByIDBranch,
  createBranchCont,
  updateBranchCont,
  deleteBranchCont,
} = require("../controllers/branch/branch");

const router = express.Router();

router.get("/", getAllBranch);
router.get("/:id", getByIDBranch);
router.post("/create", createBranchCont);
router.put("/update/:id", updateBranchCont);
router.delete("/delete/:id", deleteBranchCont);
module.exports = router;
