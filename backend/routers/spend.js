const express = require("express");
const { createSpendCont } = require("../controllers/spend/spend");
const auth = require("../middleware/auth");
const router = express.Router();
/**
 * @swagger
 * /spend/create:
 *   post:
 *     summary: Yangi xarajat yaratish
 *     tags:
 *       - Spend
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin_id:
 *                 type: integer
 *                 description: Admin  IDsi
 *               worker_id:
 *                 type: integer
 *                 description: Ishchi IDsi
 *               town_id:
 *                 type: integer
 *                 description: Shahar IDsi
 *               operator_id:
 *                 type: integer
 *                 description: Operator IDsi
 *               cost:
 *                 type: number
 *                 description: Xarajat miqdori
 *               category:
 *                 type: string
 *                 description: Xarajat turi
 *     responses:
 *       201:
 *         description: Yangi xarajat muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       500:
 *         description: Server xatosi
 */

router.post("/create", auth("admin"), createSpendCont);
module.exports = router;
