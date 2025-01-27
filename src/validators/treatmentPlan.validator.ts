import Joi from "joi";
export const treatmentPlanSchema = Joi.object({
  name: Joi.string().required(),
  startTime: Joi.string().required(),
  stepdownServices: Joi.string().optional(),
  dischargePlanning: Joi.string().optional(),
  agencies: Joi.string().optional(),
  endTime: Joi.string().optional(),
  service: Joi.string().required(),
  placeOfService: Joi.string().required(),
  maintenanceRecommendation: Joi.string().optional(),
  strength: Joi.string().optional(),
  needs: Joi.string().optional(),
  abilites: Joi.string().optional(),
  preferences: Joi.string().optional(),
  planning: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});
