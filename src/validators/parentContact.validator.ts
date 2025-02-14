import { contactedStatus } from "@prisma/client";
import Joi from "joi";
export const parentContactSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  state: Joi.string().required(),
  comment: Joi.string().optional(),
  relationship: Joi.string()
    .valid(...Object.values(contactedStatus))
    .required(),
});
