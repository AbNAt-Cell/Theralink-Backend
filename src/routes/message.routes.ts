import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { messageSchema } from "../validators/message.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new MessageController();

router.post(
  "/",
  authenticate,
  validateRequest(messageSchema),
  (req, res) => void controller.createMessage(req, res)
);
router.get(
  "/",
  authenticate,
  (req, res) => void controller.getMessages(req, res)
);
router.get(
  "/:id",
  authenticate,
  (req, res) => void controller.getMessageById(req, res)
);
router.put(
  "/:id",
  validateRequest(messageSchema),
  (req, res) => void controller.updateMessage(req, res)
);
router.delete(
  "/:id",
  authenticate,
  (req, res) => void controller.deleteMessage(req, res)
);

export default router;

/**
 * @swagger
 * /api/message:
 *   get:
 *     tags: [Message]
 *     summary: Get all message
 *     responses:
 *       200:
 *         description: List of message retrieved successfully
 *
 *   post:
 *     tags: [Message]
 *     summary: Create new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               subject:
 *                 type: string
 *               isRead:
 *                 type: boolean
 *               isImportant:
 *                 type: boolean
 *               isSpam:
 *                 type: boolean
 *               isDeleted:
 *                 type: boolean
 *               image:
 *                 type: string
 *               toUserId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DELIVERED, SENT, READ]
 *      responses:
 *         201:
 *           description: CollateralContact record created successfully
 * /api/message/{id}:
 *   get:
 *     tags: [Message]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *   put:
 *     tags: [Message]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               subject:
 *                 type: string
 *               isRead:
 *                 type: boolean
 *               isImportant:
 *                 type: boolean
 *               isSpam:
 *                 type: boolean
 *               isDeleted:
 *                 type: boolean
 *               image:
 *                 type: string
 *               toUserId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DELIVERED, SENT, READ]
 *   delete:
 *     tags: [Message]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
