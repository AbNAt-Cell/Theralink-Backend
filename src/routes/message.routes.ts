import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { messageSchema } from "../validators/message.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new MessageController();

router.get(
  "/:conversationId",
  authenticate,
  (req, res) => void controller.getMessages(req, res)
);

router.get(
  "/",
  authenticate,
  (req, res) => void controller.getUserMessage(req, res)
);

router.put(
  "/:id",
  authenticate,
  validateRequest(messageSchema),
  (req, res) => void controller.updateMessage(req, res)
);

router.delete(
  "/:id",
  authenticate,
  (req, res) => void controller.deleteMessage(req, res)
);

router.put(
  "/:id/mark-as-unread",
  authenticate,
  (req, res) => void controller.markMessageAsUnRead(req, res)
);

router.put(
  "/:id/mark-as-read",
  authenticate,
  (req, res) => void controller.markMessageAsRead(req, res)
);

router.put(
  "/:id/mark-as-important",
  authenticate,
  (req, res) => void controller.markMessageAsImportant(req, res)
);

router.put(
  "/:id/add-to-trash",
  authenticate,
  (req, res) => void controller.addMessageToTrash(req, res)
);

router.put(
  "/:id/remove-from-trash",
  authenticate,
  (req, res) => void controller.removeMessageFromTrash(req, res)
);

router.put(
  "/:id/mark-as-unimportant",
  authenticate,
  (req, res) => void controller.markMessageAsUnImportant(req, res)
);
export default router;

/**
 * components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Message:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier for the message
        body:
          type: string
          description: Content of the message
        subject:
          type: string
          nullable: true
          description: Subject of the message
        image:
          type: array
          items:
            type: string
          description: Array of image URLs
        toUserId:
          type: string
          description: ID of the recipient user
        status:
          type: string
          enum: [DELIVERED, SENT, READ]
          nullable: true
          description: Status of the message
        isRead:
          type: boolean
          description: Checks if the message has been read
        isImportant:
          type: boolean
          description: Checks if the message is marked as important
        isSpam:
          type: boolean
          description: Checks if the message is marked as spam
        isDeleted:
          type: boolean
          description: Checks if the message is in the trash
        userId:
          type: string
          description: ID of the sender
        conversationId:
          type: string
          description: ID of the associated conversation
        createdAt:
          type: string
          format: date-time
          description: Timestamp when the message was created
        updatedAt:
          type: string
          format: date-time
          description: Timestamp when the message was last updated
    MessageAggregation:
      type: object
      properties:
        totalMessages:
          type: number
          description: Total number of messages (sent or received)
        readMessages:
          type: number
          description: Number of read messages
        unreadMessages:
          type: number
          description: Number of unread messages
        inboxMessages:
          type: number
          description: Number of messages in the inbox
        importantMessages:
          type: number
          description: Number of important messages

/api/message/{conversationId}:
  post:
    tags: [Message]
    summary: Create a new message
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: conversationId
        required: true
        schema:
          type: string
        description: ID of the conversation
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - body
              - toUserId
            properties:
              body:
                type: string
                description: Content of the message
              subject:
                type: string
                nullable: true
                description: Subject of the message
              image:
                type: array
                items:
                  type: string
                description: Array of image URLs
              toUserId:
                type: string
                description: ID of the recipient user
              status:
                type: string
                enum: [DELIVERED, SENT, READ]
                nullable: true
                description: Status of the message
    responses:
      201:
        description: Message created successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message created successfully
                message:  # Changed from Message to lowercase for consistency
                  $ref: '#/components/schemas/Message'
      400:
        description: Invalid request data
      500:
        description: Failed to create message

  get:
    tags: [Message]
    summary: Get messages by conversation ID
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: conversationId
        required: true
        schema:
          type: string
        description: ID of the conversation
      - in: query
        name: page
        schema:
          type: integer
          default: 1
        description: Page number for pagination
      - in: query
        name: limit
        schema:
          type: integer
          default: 10
        description: Number of messages per page
    responses:
      200:
        description: Messages retrieved successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                totalCount:
                  type: integer
                  description: Total number of messages
                totalPages:
                  type: integer
                  description: Total number of pages
                currentPage:
                  type: integer
                  description: Current page number
                messages:
                  type: array
                  items:
                    $ref: '#/components/schemas/Message'
      500:
        description: Failed to fetch messages

/api/message/:
  get:
    tags: [Message]
    summary: Get aggregated message counts for a user
    security:
      - BearerAuth: []
    parameters:
      - in: query
        name: isRead
        schema:
          type: boolean
        description: Filter by read status (true/false)
      - in: query
        name: isImportant
        schema:
          type: boolean
        description: Filter by important status (true/false)
      - in: query
        name: isSpam
        schema:
          type: boolean
        description: Filter by spam status (true/false)
      - in: query
        name: isDeleted
        schema:
          type: boolean
        description: Filter by deleted status (true/false, defaults to false)
    responses:
      200:
        description: Aggregated message counts retrieved successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message counts fetched successfully
                totalMessages:
                  type: number
                readMessages:
                  type: number
                unreadMessages:
                  type: number
                inboxMessages:
                  type: number
                importantMessages:
                  type: number
      401:
        description: Unauthorized
      500:
        description: Failed to fetch message counts

/api/message/{messageId}:
  put:
    tags: [Message]
    summary: Update a message
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to update
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              body:
                type: string
                description: Content of the message
              subject:
                type: string
                nullable: true
                description: Subject of the message
              image:
                type: array
                items:
                  type: string
                description: Array of image URLs
              toUserId:
                type: string
                description: ID of the recipient user
              status:
                type: string
                enum: [DELIVERED, SENT, READ]
                nullable: true
                description: Status of the message
    responses:
      200:
        description: Message updated successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                message:  # Changed from Message to lowercase
                  $ref: '#/components/schemas/Message'
      400:
        description: Invalid request data
      404:
        description: Message not found
      500:
        description: Failed to update message

  delete:
    tags: [Message]
    summary: Delete a message
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to delete
    responses:
      200:
        description: Message deleted successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message deleted successfully
      404:
        description: Message not found
      500:
        description: Failed to delete message

/api/message/{messageId}/mark-as-read:
  put:
    tags: [Message]
    summary: Mark a message as read
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to mark as read
    responses:
      200:
        description: Message marked as read successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message

/api/message/{messageId}/mark-as-unread:
  put:
    tags: [Message]
    summary: Mark a message as unread
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to mark as unread
    responses:
      200:
        description: Message marked as unread successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message

/api/message/{messageId}/mark-as-important:
  put:
    tags: [Message]
    summary: Mark a message as important
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to mark as important
    responses:
      200:
        description: Message marked as important successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message

/api/message/{messageId}/mark-as-unimportant:
  put:
    tags: [Message]
    summary: Mark a message as unimportant
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to mark as unimportant
    responses:
      200:
        description: Message marked as unimportant successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message

/api/message/{messageId}/add-to-trash:
  put:
    tags: [Message]
    summary: Move a message to trash
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to move to trash
    responses:
      200:
        description: Message moved to trash successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message

/api/message/{messageId}/remove-from-trash:
  put:
    tags: [Message]
    summary: Remove a message from trash
    security:
      - BearerAuth: []
    parameters:
      - in: path
        name: messageId
        required: true
        schema:
          type: string
        description: ID of the message to remove from trash
    responses:
      200:
        description: Message removed from trash successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  example: Message updated successfully
                newMessage:
                  $ref: '#/components/schemas/Message'
      404:
        description: Message not found
      500:
        description: Failed to update message
 */
