const express = require("express");
const {
  createOperatorCont,
  createAdminCont,
  updateOperatorCont,
  updateAdminCont,
  selectOperatorCont,
  selectAdminFilterCont,
  selectOperatorFilterCont,
  loginCont,
} = require("../controllers/super_admin/super_admin");
const router = express.Router();

/**
 * @swagger
 * /super-admin/login:
 *   post:
 *     summary: Super Admin login
 *     tags: [SuperAdmin]
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
 *                 description: Super admin login username
 *                 example: superadmin1
 *               password:
 *                 type: string
 *                 description: Super admin password
 *                 example: superSecurePass!
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
 *                   description: JWT token for authenticated super admin
 *                 super_admin:
 *                   type: string
 *                   description: Super admin username
 *       401:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: parol is incorrect
 *       404:
 *         description: Super admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: super_admin not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
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
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
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
 *               - town_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *               admin_id:
 *                 type: integer
 *               town_id:
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
 *               - town_id
 *               - login
 *               - password
 *             properties:
 *               branch_id:
 *                 type: integer
 *               town_id:
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

router.post("/login", loginCont);
router.post("/create-admin", createAdminCont);
router.post("/create-operator", createOperatorCont);

router.put("/update-admin/:id", updateAdminCont);
router.put("/update-operator/:id", updateOperatorCont);

module.exports = router;
