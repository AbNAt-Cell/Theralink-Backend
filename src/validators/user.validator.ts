import { Role } from "@prisma/client";
import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().optional(),
  username: Joi.string().optional(),
  name: Joi.string().optional(),
  limit: Joi.number().optional(),
  page: Joi.number().optional(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
});
