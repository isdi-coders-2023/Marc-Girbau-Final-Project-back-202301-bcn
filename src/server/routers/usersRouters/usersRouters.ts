import { validate } from "express-validation";
import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/userControllers.js";
import routes from "../routes.js";
import loginUserSchema from "../../schemas/User/loginUserSchema.js";
import registerUserSchema from "../../schemas/User/registerUserSchema.js";

const { login, register } = routes.users;

const usersRouter = Router();

usersRouter.post(
  login,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

usersRouter.post(
  register,
  validate(registerUserSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
