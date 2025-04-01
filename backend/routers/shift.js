const express = require("express");
const {
  createShiftCont,
  updateShiftCont,
} = require("../controllers/shift/shift");

const router = express.Router();
/**
 * @swagger
 * /shift/create:
 *   post:
 *     summary: Create a new shift
 *     tags: [Shift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shift_number:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 example: "10:10:10"
 *               end_time:
 *                 type: string
 *                 example: "15:10:10"
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shift created successfully
 *       404:
 *         description: Not saved
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /shift/update/{id}:
 *   put:
 *     summary: Update an existing shift
 *     tags: [Shift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the shift to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shift_number:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: time
 *               end_time:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shift updated successfully
 *       404:
 *         description: Not updated
 *       500:
 *         description: Server error
 */

router.post("/create", createShiftCont);
router.put("/update/:id", updateShiftCont);

module.exports = router;
