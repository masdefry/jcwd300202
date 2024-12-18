import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const verifyEmailRequestValidator = [
    body(['email']).notEmpty().withMessage('Email field required!'),
    body('email').isEmail().withMessage('Email address invalid!').isLength({max: 180}).withMessage('Email length maximum 180 characters').escape(),
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const errorResult = validationResult(req)
     
            if(errorResult.isEmpty() === false){
                throw {msg: errorResult.array()[0].msg, status: 406}
            }else{
                next()
            }
        } catch (error) {
            next(error)
        }
    }
]