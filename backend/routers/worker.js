const express = require("express");
const {
  createWorkerCont,
  updateWorkerCont,
  deleteWorkerCont,
} = require("../controllers/worker/worker");
const router = express.Router();

router.post("/create", createWorkerCont);
router.put("/update/:id", updateWorkerCont);
router.delete("/delete/:id", deleteWorkerCont);
module.exports = router;
