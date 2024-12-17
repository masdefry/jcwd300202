import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const verifyEmailValidator = [
    body(['id', 'role', 'token', 'password']).notEmpty().withMessage('Id, Role, Token, and Password field required!'),
    body('id').isString().escape(),
    body('role').isString().escape(),
    body('token').isString().escape(),
    body('password').isString().isLength({min: 8, max: 180}).withMessage('Password length must between 8 and 180 characters!').escape(),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const errorResult = validationResult(req)

            if(errorResult.isEmpty() === false) {
                throw { msg: errorResult.array()[0].msg, status: 406 }
            } else {
                next()
            }
        } catch (error) {
            next(error)
        }
    }
]