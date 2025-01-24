import Joi from "joi";
export const vitalSchema = Joi.object({
  bpSys: Joi.number().required(),
  bpDias: Joi.number().required(),
  temperature: Joi.number().required(),
  pulseRate: Joi.number().required(),
  respiratoryRate: Joi.number().required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  recordDate: Joi.date().required(),
});
