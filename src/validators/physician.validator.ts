import Joi from "joi";
export const physicianSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  comment: Joi.string().required(),
});
