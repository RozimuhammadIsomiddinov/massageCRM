const express = require("express");
const {
  createOfferCont,
  deleteOfferCont,
  updateOfferCont,
} = require("../controllers/offer/offer");
const upload = require("../middleware/multer");
const {
  createFileCont,
  selectFileCont,
  updateFileCont,
} = require("../controllers/file/file");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Offer
 */

/**
 * @swagger
 * /offer/create:
 *   post:
 *     summary: Create a new offer
 *     tags: [Offer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_time
 *               - end_time
 *               - cost
 *               - admin_id
 *               - worker_id
 *               - town_id
 *               - operator_id
 *               - client_name
 *               - description
 *             properties:
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               cost:
 *                 type: number
 *               admin_id:
 *                 type: integer
 *               worker_id:
 *                 type: integer
 *               town_id:
 *                 type: integer
 *               operator_id:
 *                 type: integer
 *               client_name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Offer created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/update/{id}:
 *   put:
 *     summary: Update an existing offer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Offer ID
 *       - in: query
 *         name: prolongation
 *         required: true
 *         schema:
 *           type: string
 *         example: "10:10:05"
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/delete/{id}:
 *   delete:
 *     summary: Delete an offer
 *     tags: [Offer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer deleted successfully
 *       404:
 *         description: Offer already deleted
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/file/{id}:
 *   get:
 *     summary: Get all files (or by offer_id if added)
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: File ID
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/create-file/{offer_id}:
 *   post:
 *     summary: Upload a file and associate it with an offer
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: offer_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Offer ID to associate with the uploaded file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: File not uploaded
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /offer/update-file/{id}:
 *   put:
 *     summary: Update an uploaded file
 *     tags: [Upload]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: File record ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File updated successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */

router.get("/file/:id", selectFileCont);
router.post("/create-file/:offer_id", upload.single("file"), createFileCont);
router.put("/update-file/:id", upload.single("file"), updateFileCont);
router.post("/create", createOfferCont);
router.put("/update/:id", updateOfferCont);
router.delete("/delete/:id", deleteOfferCont);
module.exports = router;
