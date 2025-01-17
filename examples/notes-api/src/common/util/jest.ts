import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export { prismaMock } from "../../../prisma/singleton";

/**
 * Generate implementation for protectMiddleware that mocks authorization.
 * @param reqUser User token data to set to req.user
 * @returns Function that generates protectMiddleware function implementation
 */
export const genProtectMiddlewareAuthImpl =
  (reqUser: DecodedJWT) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.user = reqUser;
    return next();
  };

/**
 * Restore original implementation for protectMiddleware.
 * @returns protectMiddleware function implementation
 */
export const restoreProtectMiddlewareImpl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { protectMiddleware } = jest.requireActual("../auth");
  return protectMiddleware(req, res, next);
};

/**
 * Produce hash from plain text password synchronously.
 * @param password Plain text password to be encrypted
 * @returns The encrypted data salt
 */
export const hashPasswordSync = (password: string) =>
  bcrypt.hashSync(password, 5);
