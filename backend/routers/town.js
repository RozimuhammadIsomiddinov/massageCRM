const express = require("express");
const {
  getAlltown,
  getByIDtown,
  createtownCont,
  updatetownCont,
  deletetownCont,
} = require("../controllers/town/town");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: town
 */

/**
 * @swagger
 * /town:
 *   get:
 *     summary: Get all townes
 *     tags: [town]
 *     responses:
 *       200:
 *         description: List of all townes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: townes not found
 */

/**
 * @swagger
 * /town/{id}:
 *   get:
 *     summary: Get a town by ID
 *     tags: [town]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: town ID
 *     responses:
 *       200:
 *         description: town data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: ID not sent
 *       404:
 *         description: town not found
 */

/**
 * @swagger
 * /town/create:
 *   post:
 *     summary: Create a new town
 *     tags: [town]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - branch_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "town"
 *               branch_id:
 *                  type: integer
 *                  exmaple: 1
 *     responses:
 *       201:
 *         description: town successfully created
 *       400:
 *         description: Missing name field
 *       404:
 *         description: town not saved
 */

/**
 * @swagger
 * /town/update/{id}:
 *   put:
 *     summary: Update a town
 *     tags: [town]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: town ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - branch_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated town Name"
 *               branch_id:
 *                  type: integer
 *                  example: 1
 *     responses:
 *       200:
 *         description: town successfully updated
 *       400:
 *         description: Missing fields
 *       404:
 *         description: town not found or not updated
 */

/**
 * @swagger
 * /town/delete/{id}:
 *   delete:
 *     summary: Delete a town
 *     tags: [town]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: town ID
 *     responses:
 *       200:
 *         description: town successfully deleted
 *       400:
 *         description: ID not sent
 *       404:
 *         description: town not found
 */

router.get("/", getAlltown);
router.get("/:id", getByIDtown);
router.post("/create", createtownCont);
router.put("/update/:id", updatetownCont);
router.delete("/delete/:id", deletetownCont);
module.exports = router;
