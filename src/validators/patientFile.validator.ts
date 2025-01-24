import Joi from 'joi';
export const patientFileSchema = Joi.object({
    filePath: Joi.string().required(),
    fileType: Joi.string().required(),
    fileUrl: Joi.string().required(),
    
    description: Joi.date().optional(),
});
