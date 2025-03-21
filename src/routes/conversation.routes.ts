import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { conversationSchema } from "../validators/conversation.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new ConversationController();
router.post(
  "/:patientid",
  validateRequest(conversationSchema),
  authenticate,

  (req, res) => void controller.createConversation(req, res)
);

// Route to get all Conversations for a patient
router.get(
  "/",
  authenticate,
  (req, res) => void controller.getConversations(req, res)
);

// Route to get a specific Conversation by ID
router.get(
  "/:id",
  authenticate,
  (req, res) => void controller.getConversationById(req, res)
);

// Route to Update specific Conversation
router.put(
  "/:id",
  authenticate,

  validateRequest(conversationSchema),
  (req, res) => void controller.updateConversation(req, res)
);

// Route to delete a specific Conversation
router.delete(
  "/:id",
  authenticate,
  (req, res) => void controller.deleteConversation(req, res)
);

export default router;
/**
 * @swagger
 * /api/conversations/:
 *   get:
 *     tags: [Conversation]
 *     summary: Get all conversations for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount: { type: integer }
 *                 totalPages: { type: integer }
 *                 currentPage: { type: integer }
 *                 conversations: { type: array, items: { $ref: '#/components/schemas/Conversation' } }
 *
 * /api/conversations/{patientId}:
 *   post:
 *     tags: [Conversation]
 *     summary: Create a new conversation for a patient
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient to start a conversation with
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastMessage:
 *                 type: string
 *                 description: Initial message for the conversation
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 conversation: { $ref: '#/components/schemas/Conversation' }
 *
 * /api/conversations/{id}:
 *   get:
 *     tags: [Conversation]
 *     summary: Get a specific conversation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the conversation
 *     responses:
 *       200:
 *         description: Conversation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversation: { $ref: '#/components/schemas/Conversation' }
 *
 *   put:
 *     tags: [Conversation]
 *     summary: Update a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the conversation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastMessage:
 *                 type: string
 *                 description: Updated last message
 *     responses:
 *       200:
 *         description: Conversation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 conversation: { $ref: '#/components/schemas/Conversation' }
 *
 *   delete:
 *     tags: [Conversation]
 *     summary: Delete a conversation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the conversation to delete
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         lastMessage: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */