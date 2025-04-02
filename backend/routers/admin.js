const express = require("express");
const {
  loginCont,
  archiveCont,
  statisticWorkerCont,
  selectOperatorAdminCont,
} = require("../controllers/admin/admin");
const auth = require("../middleware/auth");
const {
  createOperatorCont,
  selectOperatorFilterCont,
} = require("../controllers/super_admin/super_admin");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Admin
 */

/**
 * @swagger
 * /all-login:
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
 *                 description: All login username
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
/**
 * @swagger
 * /admin/archive:
 *   get:
 *     summary: Archive statistics
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         example: "10:10:10"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         example: "18:10:10"
 *     responses:
 *       200:
 *         description: Muvoffaqiyatli natija
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description:  (missing params)
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /admin/statistic-worker:
 *   get:
 *     summary: Worker statistikasi
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Boshlang‘ich sana (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Tugash sanasi (YYYY-MM-DD)
 *         example: "2024-02-01"
 *     responses:
 *       200:
 *         description: Muvoffaqiyatli natija
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   worker_id:
 *                     type: integer
 *                     description: Ishchi ID si
 *                   worker_name:
 *                     type: string
 *                     description: Ishchi ismi
 *                   cancelled:
 *                     type: integer
 *                     description: Bekor qilingan takliflar soni
 *                   all_guest:
 *                     type: integer
 *                     description: Jami qabul qilingan mehmonlar soni
 *                   income:
 *                     type: number
 *                     description: Jami daromad
 *                   worker_part:
 *                     type: number
 *                     description: Ishchi ulushi (5%)
 *                   total_working_hours:
 *                     type: number
 *                     description: Ishlangan soatlar (sekundlarda)
 *       400:
 *         description:  (missing params)
 *       500:
 *         description: Server xatosi
 */
router.get("/control", auth("admin"), selectOperatorAdminCont);
router.get("/archive", auth("admin"), archiveCont);
router.get("/statistic-worker", auth("admin"), statisticWorkerCont);
router.post("/login", loginCont);
router.post("/operator-filter", auth("admin"), selectOperatorFilterCont);
router.post("/add-operator", auth("admin"), createOperatorCont);

module.exports = router;
