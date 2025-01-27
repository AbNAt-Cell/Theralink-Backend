import { treatmentGoalsStatus } from "@prisma/client";
import Joi from "joi";
export const treatmentGoalsSchema = Joi.object({
  name: Joi.string().required(),
  comments: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  targetDate: Joi.date().required(),
  status: Joi.string().valid(...Object.values(treatmentGoalsStatus)).required(),
});
