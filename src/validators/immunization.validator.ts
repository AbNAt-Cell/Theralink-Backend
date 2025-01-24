import Joi from "joi";
export const immunizationSchema = Joi.object({
  vaccineName: Joi.string().required(),
  manufacturer: Joi.string().required(),
  temperature: Joi.number().required(),
  lotNumber: Joi.string().required(),
  adminstrationSite: Joi.string().required(),
  administeredBy: Joi.string().required(),
  comments: Joi.string().required(),
  rejectedReason: Joi.string().required(),
  immunization: Joi.string().optional(),
  dose: Joi.number().required(),
  isRejected: Joi.boolean().required(),
  dateAdministered: Joi.date().required(),
  dateExpired: Joi.date().required(),
});
