const express = require("express");
const {
  createWorkerCont,
  updateWorkerCont,
  deleteWorkerCont,
  selectAllWorkerCont,
} = require("../controllers/worker/worker");
const auth = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Worker
 */

/**
 * @swagger
 * /worker:
 *   get:
 *     summary: Get all Worker
 *     tags: [Worker]
 *     responses:
 *       200:
 *         description: List of all worker
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: worker not found
 */

/**
 * @swagger
 * /worker/create:
 *   post:
 *     summary: Yangi worker yaratish
 *     tags: [Worker]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - operator_id
 *               - town_id
 *               - name
 *             properties:
 *               branch_id:
 *                 type: integer
 *                 example: 1
 *               town_id:
 *                 type: integer
 *                 example: 1
 *               operator_id:
 *                 type: integer
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: Ali Valiyev
 *     responses:
 *       201:
 *         description: Worker muvaffaqiyatli yaratildi
 *       400:
 *         description: Kiritilgan ma'lumotlar to‘liq emas
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /worker/update/{id}:
 *   put:
 *     summary: Worker ma'lumotlarini yangilash
 *     tags: [Worker]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Worker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - operator_id
 *               - town_id
 *               - name
 *             properties:
 *               branch_id:
 *                 type: integer
 *                 example: 1
 *               town_id:
 *                 type: integer
 *                 example: 1
 *               operator_id:
 *                 type: integer
 *                 example: 2
 *               name:
 *                 type: string
 *                 example: Ali Valiyev
 *     responses:
 *       200:
 *         description: Worker muvaffaqiyatli yangilandi
 *       400:
 *         description: Kiritilgan ma'lumotlar to‘liq emas
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /worker/delete/{id}:
 *   delete:
 *     summary: Worker ochirish
 *     tags: [Worker]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Worker muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Worker allaqachon o‘chirilgan
 *       500:
 *         description: Server xatosi
 */

router.get("/", selectAllWorkerCont);
router.post("/create", /*, auth("operator")*/ createWorkerCont);
router.put("/update/:id", /*, auth("operator")*/ updateWorkerCont);
router.delete("/delete/:id", /*, auth("operator")*/ deleteWorkerCont);
module.exports = router;
