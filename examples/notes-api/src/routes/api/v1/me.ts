import { NextFunction, Request, Response, Router } from 'express'

import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'

const router = Router()

/**
 * Express middleware that generates response data from a user.
 */
const genUserDataMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return next(new ServerError('auth'))
    }

    let user
    try {
        user = await prisma.user.findUniqueOrThrow({
            where: { uuid: req.user.uuid },
        })
    } catch (err) {
        if (err instanceof Error) {
            return next(new ServerError('auth', undefined, err))
        }
        return next(err)
    }

    res.locals.data = { ...user }
    delete res.locals.data.password
    delete res.locals.data.createdAt
    delete res.locals.data.updatedAt

    return next()
}

// Validate user credentials & create new session
router.get('/', genUserDataMiddleware, async (req, res) =>
    res.json({ data: res.locals.data })
)

export { router as meHandler }