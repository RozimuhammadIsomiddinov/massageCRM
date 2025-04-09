const express = require("express");
const {
  createShiftCont,
  updateShiftCont,
  selectShiftCont,
} = require("../controllers/shift/shift");
const auth = require("../middleware/auth");

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

/**
 * @swagger
 * /shift:
 *   get:
 *     summary: Get list of all shifts
 *     tags: [Shift]
 *     responses:
 *       200:
 *         description: List of shifts returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Server error
 */

router.get("/", selectShiftCont);
router.post("/create", /* auth("admin"), */ createShiftCont);
router.put("/update/:id", /* auth("admin"), */ updateShiftCont);

module.exports = router;
