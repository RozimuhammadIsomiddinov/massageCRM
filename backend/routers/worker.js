const express = require("express");
const {
  createWorkerCont,
  updateWorkerCont,
  deleteWorkerCont,
  selectAllWorkerCont,
  resultWorkCont,
  percentResultCont,
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
 *               - percent
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
 *               percent:
 *                 type: integer
 *                 example: 25
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
 *               - percent
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
 *               percent:
 *                 type: integer
 *                 example: 25
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

/**
 * @swagger
 * /worker/result/{worker_id}:
 *   get:
 *     summary: Workerning barcha ish natijalarini olish
 *     tags: [Worker]
 *     parameters:
 *       - in: path
 *         name: worker_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Workerga tegishli barcha offerlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   start_time:
 *                     type: string
 *                   end_time:
 *                     type: string
 *                   cost:
 *                     type: number
 *                   admin_name:
 *                     type: string
 *                   admin_id:
 *                     type: integer
 *                   operator_id:
 *                     type: integer
 *                   operator_name:
 *                     type: string
 *                   client_name:
 *                     type: string
 *                   is_cancelled:
 *                     type: boolean
 *                   prolongation:
 *                     type: boolean
 *                   created_at:
 *                     type: string
 *                   town_id:
 *                     type: integer
 *                   town_name:
 *                     type: string
 *       400:
 *         description: Worker ID kiritilmagan
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /worker/result:
 *   post:
 *     summary: Worker uchun natijani (foiz, pul va description) saqlash
 *     tags: [Worker]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - admin_id
 *               - worker_id
 *               - town_id
 *               - operator_id
 *               - cost
 *               - percent_worker
 *             properties:
 *               admin_id:
 *                 type: integer
 *                 example: 1
 *               worker_id:
 *                 type: integer
 *                 example: 2
 *               town_id:
 *                 type: integer
 *                 example: 3
 *               offer_id:
 *                 type: integer
 *                 example: 3
 *               operator_id:
 *                 type: integer
 *                 example: 4
 *               cost:
 *                 type: number
 *                 example: 50000
 *               percent_worker:
 *                 type: number
 *                 example: 20
 *               description:
 *                 type: string
 *                 example: "Bonus uchun maxsus ish"
 *     responses:
 *       201:
 *         description: Result muvaffaqiyatli saqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 admin_id:
 *                   type: integer
 *                 worker_id:
 *                   type: integer
 *                 town_id:
 *                   type: integer
 *                 operator_id:
 *                   type: integer
 *                 cost:
 *                   type: number
 *                 percent_worker:
 *                   type: number
 *                 description:
 *                   type: string
 *                 created_at:
 *                   type: string
 *       400:
 *         description: Kerakli ma'lumotlar to‘liq emas
 *       500:
 *         description: Server xatosi
 */

router.get("/", selectAllWorkerCont);
router.get("/result/:worker_id", resultWorkCont);
router.post("/result", percentResultCont);
router.post("/create", /*, auth("operator")*/ createWorkerCont);
router.put("/update/:id", /*, auth("operator")*/ updateWorkerCont);
router.delete("/delete/:id", /*, auth("operator")*/ deleteWorkerCont);
module.exports = router;
