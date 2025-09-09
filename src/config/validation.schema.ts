import Joi from "joi";

export const validationSchema: Joi.ObjectSchema = Joi.object({
  APP_PORT: Joi.number().default(3000),
  UPDATE_DELAY: Joi.number().default(10),
  SERVICE_FEE: Joi.number().default(0.01),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
});
