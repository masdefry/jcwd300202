import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const loginValidator = [
    body(['email', 'password']).notEmpty().withMessage('Email and Password field required!'),
    body('email').isEmail().withMessage('Email address invalid!').escape(),
    body('password').isString().isLength({min: 8, max: 180}).withMessage('Password length must between 8 and 180 characters!').escape(),
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