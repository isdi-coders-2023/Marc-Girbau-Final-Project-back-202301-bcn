import "../../../loadEnvironment.js";
import { ValidationError } from "express-validation";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../utils/statusCodes.js";

const debug = createDebug("gamelab:server:middlewares:errors");

const {
  clientError: { notFound },
  serverError: { internalServer },
} = statusCodes;

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Endpoint not found",
    notFound,
    "Endpoint not found"
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || internalServer;
  const publicMessage = error.publicMessage || "Something went wrong";

  if (error instanceof ValidationError) {
    debug(error.details.body!.map((error) => error.message).join(" - "));

    const publicMessage = "Validation has failed";

    res.status(statusCode).json({ error: publicMessage });

    return;
  }

  res.status(statusCode).json({ error: publicMessage });
};
