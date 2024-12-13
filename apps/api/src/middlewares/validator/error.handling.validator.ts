import { NextFunction } from "express";
import { validationResult } from "express-validator";

export const errorHandlingValidator = (req: Request, res: Response, next: NextFunction) => {
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