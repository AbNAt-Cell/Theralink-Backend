import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { conversationSchema } from "../validators/conversation.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new ConversationController();
router.post(
  "/:patientid",
  validateRequest(conversationSchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.createConversation(req, res)
);

// Route to get all Conversations for a patient
router.get(
  "/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getConversations(req, res)
);

// Route to get a specific Conversation by ID
router.get(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getConversationById(req, res)
);

// Route to Update specific Conversation
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(conversationSchema),
  (req, res) => void controller.updateConversation(req, res)
);

// Route to delete a specific Conversation
router.delete(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.deleteConversation(req, res)
);

export default router;

/**
 * @swagger
 * /api/conversations/{patientId}:
 *   get:
 *     tags: [Conversation]
 *     summary: Get all Conversations records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Conversations records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Conversations records retrieved successfully
 *
 *   post:
 *     tags: [Conversation]
 *     summary: Create new Conversations for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Conversations is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastMessage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conversation record created successfully
 *
 * /api/conversations/{id}/{patientId}:
 *   get:
 *     tags: [Conversation]
 *     summary: Get a specific Conversations record by patient ID and Conversations ID
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Conversations record
 *     responses:
 *       200:
 *         description: Conversation record retrieved successfully
 *
 *   put:
 *     tags: [Conversation]
 *     summary: Update Conversations record for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Conversations record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastMessage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conversation record updated successfully
 *
 *   delete:
 *     tags: [Conversation]
 *     summary: Delete a specific Conversations record
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Conversations record to be deleted
 *     responses:
 *       204:
 *         description: Conversation record deleted successfully
 */
