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

/**
 * @swagger
 * tags:
 *   name: SuperAdmin
 */

/**
 * @swagger
 * /super-admin/operator:
 *   get:
 *     summary: Get all operators
 *     tags: [SuperAdmin]
 *     responses:
 *       200:
 *         description: List of operators
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/admin-filter:
 *   post:
 *     summary: Filter admins by date range
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *             properties:
 *               from:
 *                 type: string
 *                 format: date
 *               to:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Filtered admin list
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/operator-filter:
 *   post:
 *     summary: Filter operators by date range
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *             properties:
 *               from:
 *                 type: string
 *                 format: date
 *               to:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Filtered operator list
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/create-admin:
 *   post:
 *     summary: Create a new admin
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/create-operator:
 *   post:
 *     summary: Create a new operator
 *     tags: [SuperAdmin]
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
 *               admin_id:
 *                 type: integer
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Operator created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/update-admin/{id}:
 *   put:
 *     summary: Update an admin
 *     tags: [SuperAdmin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /super-admin/update-operator/{id}:
 *   put:
 *     summary: Update an operator
 *     tags: [SuperAdmin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Operator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Operator updated successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

router.get("/operator", selectOperatorCont);

router.post("/admin-filter", selectAdminFilterCont);
router.post("/operator-filter", selectOperatorFilterCont);

router.post("/create-admin", createAdminCont);
router.post("/create-operator", createOperatorCont);

router.put("/update-admin/:id", updateAdminCont);
router.put("/update-operator/:id", updateOperatorCont);

module.exports = router;
