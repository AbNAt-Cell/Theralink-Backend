import Joi from 'joi';
export const documentSchema = Joi.object({
    template: Joi.string().required(),
    author: Joi.string().required(),
    client: Joi.string().required(),
    date: Joi.date().required(),
});
