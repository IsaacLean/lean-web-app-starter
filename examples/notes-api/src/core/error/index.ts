import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import ServerError, { isServerError } from './ServerError'

export { ServerError }

/** Type guard for Prisma errors. */
export const isPrismaKnownRequestError = (
    err: Prisma.PrismaClientKnownRequestError | Error
): err is Prisma.PrismaClientKnownRequestError =>
    err instanceof Prisma.PrismaClientKnownRequestError

/** Handle validation errors encountered by express-validator.*/
export const validateErrorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new ServerError('validation', errors.array())
    }

    return next()
}

/** Creates an error handler that takes care of all requests to undefined routes. */
export const createNotFoundErrorHandler =
    (isApiNotFoundErrorHandler?: boolean) => (req: Request) => {
        const content = `${req.originalUrl} was not found.`
        const serverErr = isApiNotFoundErrorHandler
            ? new ServerError('notFound', content)
            : new ServerError('notFound', { content })
        throw serverErr
    }

/** API error handler that takes care of all errors and renders the response as JSON. */
export const apiErrorHandler = (
    err: Error | ServerError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err)
    }

    if (isServerError(err)) {
        if (err.type === 'auth') {
            res.status(401)
        } else if (err.type === 'notFound') {
            res.status(404)
        } else if (err.type === 'validation') {
            res.status(400)
        } else if (err.type === 'misc') {
            res.status(500)
        }

        return res.json({ errors: err.errors })
    }

    return res.status(500).json({ errors: ['Internal server error'] })
}
