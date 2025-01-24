import Joi from "joi";
export const parentContactSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  relationship: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});
