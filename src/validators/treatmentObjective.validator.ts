import Joi from "joi";
export const treatmentObjectiveSchema = Joi.object({
  objective: Joi.string().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  targetDate: Joi.date().required(),
});
