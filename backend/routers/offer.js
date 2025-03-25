const express = require("express");
const {
  createOfferCont,
  deleteOfferCont,
  updateOfferCont,
} = require("../controllers/offer/offer");

const router = express.Router();

router.post("/create", createOfferCont);
router.put("/update/:id", updateOfferCont);
router.delete("/delete/:id", deleteOfferCont);
module.exports = router;
