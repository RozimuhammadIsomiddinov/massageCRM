const express = require("express");
const { loginCont } = require("../controllers/admin/admin");
const auth = require("../middleware/auth");
const {
  createOperatorCont,
} = require("../controllers/super_admin/super_admin");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Admin
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
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
 *                 description: Admin's login username
 *                 example: admin1
 *               password:
 *                 type: string
 *                 description: Admin's password
 *                 example: myStrongPassword
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
 *                   description: JWT token for authenticated admin
 *                 admin_name:
 *                   type: string
 *                   description: Admin's login username
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/add-operator:
 *   post:
 *     summary: Create a new operator
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - admin_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *                 description: ID of the branch the operator belongs to
 *                 example: 2
 *               admin_id:
 *                 type: integer
 *                 description: ID of the admin who manages this operator
 *                 example: 1
 *               login:
 *                 type: string
 *                 description: Login username for the new operator
 *                 example: operator123
 *               password:
 *                 type: string
 *                 description: Password for the new operator
 *                 example: strongPass#2025
 *     responses:
 *       201:
 *         description: Operator successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: The newly created operator object
 *       400:
 *         description: Missing fields or invalid admin/branch ID
 *       404:
 *         description: Failed to create operator
 *       500:
 *         description: Server error
 */

router.post("/login", loginCont);
router.post("/add-operator", /*  auth, */ createOperatorCont);

module.exports = router;
