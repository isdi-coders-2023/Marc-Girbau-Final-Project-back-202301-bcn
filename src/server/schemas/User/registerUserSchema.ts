import { Joi } from "express-validation";

const registerUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().required(),
  }),
};

export default registerUserSchema;
