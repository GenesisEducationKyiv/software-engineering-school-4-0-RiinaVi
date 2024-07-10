import Joi from 'joi';

const schemaObj = {
  email: Joi.string().email(),
};

export const createEmailSchema = Joi.object(schemaObj).fork(
  Object.keys(schemaObj),
  (schema) => schema.required(),
);
