import { MessageSentStatus } from "@prisma/client";
import Joi from "joi";
export const messageSchema = Joi.object({
  body: Joi.string().min(6).max(250).required(),
  subject: Joi.string().required(),
  isRead: Joi.boolean().required(),
  isImportant: Joi.boolean().required(),
  isSpam: Joi.boolean().required(),
  isDeleted: Joi.boolean().required(),
  image: Joi.string().optional(),
  toUserId: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(MessageSentStatus))
    .optional(),
});
