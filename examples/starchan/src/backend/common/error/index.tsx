import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import ServerError, { isServerError } from "./ServerError";
import {
  apiErrorHandler,
  createNotFoundErrorHandler,
  globalErrorHandler,
  ssrErrorHandler,
} from "./errorHandlers";
import { isErrorPageData } from "./errorPageData";

export {
  apiErrorHandler,
  createNotFoundErrorHandler,
  globalErrorHandler,
  isErrorPageData,
  isServerError,
  ServerError,
  ssrErrorHandler,
};

/** Type predicate for Prisma errors. */
export const isPrismaKnownRequestError = (
  err: Prisma.PrismaClientKnownRequestError | Error,
): err is Prisma.PrismaClientKnownRequestError =>
  err instanceof Prisma.PrismaClientKnownRequestError;

/**
 * Handle validation errors encountered by express-validator.
 */
export const validateErrorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ServerError(400, errors.array());
  }

  return next();
};
