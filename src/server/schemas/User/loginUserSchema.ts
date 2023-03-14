import { Joi } from "express-validation";

const loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginUserSchema;
