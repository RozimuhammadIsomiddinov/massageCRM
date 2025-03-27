const express = require("express");
const {
  createOfferCont,
  deleteOfferCont,
  updateOfferCont,
} = require("../controllers/offer/offer");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Offer
 */

/**
 * @swagger
 * /offer/create:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *               - end_time
 *               - cost
 *               - admin_id
 *               - worker_id
 *               - operator_id
 *               - client_name
 *               - description
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               cost:
 *                 type: number
 *               admin_id:
 *                 type: integer
 *               worker_id:
 *                 type: integer
 *               operator_id:
 *                 type: integer
 *               client_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Offer created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/update/{id}:
 *   put:
 *     summary: Update an existing offer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Offer ID
 *       - in: query
 *         name: prolongation
 *         required: true
 *         schema:
 *           type: string
 *         description: Prolongation value
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/delete/{id}:
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       404:
 *         description: Offer already deleted
 *       500:
 *         description: Server error
 */

router.post("/create", createOfferCont);
router.put("/update/:id", updateOfferCont);
router.delete("/delete/:id", deleteOfferCont);
module.exports = router;
