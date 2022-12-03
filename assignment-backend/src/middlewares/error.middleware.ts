import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import { ErrorRes } from "@utils/response";
import { isInstance, ValidationError } from "class-validator";
import BadRequestException from "../utils/exceptions/bad-request.exception";

const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();

  logger.error(err.stack, err.name, err);
  logger.error("****************************** ASYNC ERRORS ******************************");
  logger.error("req.originalUrl =====> ", req.get("Host"), req.originalUrl);

  let errorObj = {
    status: err.status || 500,
    message: err.message,
    error: err.error || null,
  };

  if (isInstance(err, BadRequestException)) {
    const getValidationError = (errors: ValidationError[]) => {
      let valErrors: { [key: string]: Array<string> } = {};

      for (const error of errors) {
        if (error.children.length) getValidationError(error.children);
        else {
          let valError: Array<string> = [];
          const errorConstraints = error.constraints;
          for (const constraint in errorConstraints) valError.push(errorConstraints[constraint]);
          valErrors = { ...valErrors, [error.property]: valError.reverse() } as any;
        }
      }

      return valErrors;
    };
    errorObj.error = getValidationError(err.error);
  }

  return ErrorRes(res, errorObj.status || 500, {
    message: errorObj.message || "Something went wrong.",
    error: errorObj.error,
  });
};

export default ErrorMiddleware;
