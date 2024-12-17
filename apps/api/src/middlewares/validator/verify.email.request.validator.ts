import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const verifyEmailRequestValidator = [
    body(['id', 'role']).notEmpty().withMessage('Id and Role field required!'),
    body('id').isString().escape(),
    body('role').isString().escape(),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const errorResult = validationResult(req)

            if(errorResult.isEmpty() === false) {
                throw { msg: errorResult.array()[0].msg, status: 406}
            } else {
                next()
            }
        } catch (error) {
            next(error)
        }
    }
]