const express = require("express");
const {
  getAllBranch,
  getByIDBranch,
  createBranchCont,
  updateBranchCont,
  deleteBranchCont,
} = require("../controllers/branch/branch");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Branch
 */

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Branches not found
 */

/**
 * @swagger
 * /branch/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: ID not sent
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branch/create:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Branch"
 *     responses:
 *       201:
 *         description: Branch successfully created
 *       400:
 *         description: Missing name field
 *       404:
 *         description: Branch not saved
 */

/**
 * @swagger
 * /branch/update/{id}:
 *   put:
 *     summary: Update a branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Branch Name"
 *     responses:
 *       200:
 *         description: Branch successfully updated
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Branch not found or not updated
 */

/**
 * @swagger
 * /branch/delete/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch successfully deleted
 *       400:
 *         description: ID not sent
 *       404:
 *         description: Branch not found
 */

router.get("/", getAllBranch);
router.get("/:id", getByIDBranch);
router.post("/create", createBranchCont);
router.put("/update/:id", updateBranchCont);
router.delete("/delete/:id", deleteBranchCont);
module.exports = router;
