import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const updateUserProfileValidator = [
    body(['id', 'role', 'email']).notEmpty().withMessage('Id, Role, and Email field required!'),
    body('id').isString().escape(),
    body('role').isString().escape(),
    body('email').isEmail().withMessage('Email address invalid!').isLength({max: 180}).withMessage('Email length maximum 180 characters').escape(),
    body('username').optional().isString().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters long!').escape(),
    body('gender').optional().isString().isIn(['MALE', 'FEMALE']).withMessage('Gender must be one of the following: male or female').escape(),
    body('phoneNumber').optional().isString().escape(),
    body('date').optional().isInt({ min: 1, max: 31 }).withMessage('Date must be between 1 and 31').escape(),
    body('month').optional().isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12').escape(),
    body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be between 1900 and the current year').escape(),
    body('address').optional().isString().escape(),
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