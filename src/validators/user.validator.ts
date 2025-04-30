import { Role } from "@prisma/client";
import Joi from "joi";


export const updateuserSchema = Joi.object({
  email: Joi.string().email().optional(),
  username: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  limit: Joi.number().optional(),
  page: Joi.number().optional(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .optional(),
});
