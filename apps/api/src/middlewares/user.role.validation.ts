import { NextFunction, Request, Response } from "express";

export const userRoleValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body

        if(role !== 'USER') throw { msg: 'Role unauthorized!', status: 406 }

        next()
    } catch (error) {
        next(error)
    }
}