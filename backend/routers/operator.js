const express = require("express");

const auth = require("../middleware/auth");
const {
  loginCont,
  dailyAmountCont,
} = require("../controllers/operators/operator");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Operators
 */

/**
 * @swagger
 * /operator/login:
 *   post:
 *     summary: Login as an operator
 *     tags: [Operators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Operator's login name
 *                 example: operator
 *               password:
 *                 type: string
 *                 description: Operator's password
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 operator_name:
 *                   type: string
 *                   description: Operator's login name
 *                 operaotr_role:
 *                   type: string
 *                   description: Operator's role
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: Operator not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /operator/daily:
 *   get:
 *     summary: Get daily amount statistics
 *     tags: [Operators]
 *     responses:
 *       200:
 *         description: Successfully retrieved daily amount
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 description: Daily data object
 *       500:
 *         description: Server error while fetching daily amount
 */

router.get("/daily", dailyAmountCont);
router.post("/login", loginCont);

module.exports = router;
