import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const resetPasswordValidator = [
    body(['password', 'id', 'role', 'token']).notEmpty().withMessage('Email, Password, Role, and Token field required!'),
    body('password').isString().isLength({min: 8, max: 180}).withMessage('Password length must between 8 and 180 characters!').escape(),
    body('id').isString().escape(),
    body('role').isString().escape(),
    body('token').isString().escape(),
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