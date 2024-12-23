import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const updateTenantProfileValidator = [
    body(['id', 'role', 'email']).withMessage('Id, Role, and Email field required!'),
    body('id').isString().escape(),
    body('role').isString().escape(),
    body('email').isEmail().withMessage('Email address invalid!').isLength({max: 180}).withMessage('Email length maximum 180 characters').escape(),
    body('pic').isString().escape(),
    body('address').isString().escape(),
    body('phoneNumber').isString().escape(),
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