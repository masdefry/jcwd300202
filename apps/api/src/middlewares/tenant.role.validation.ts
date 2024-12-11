import { NextFunction, Request, Response } from "express";

export const tenantRoleValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body

        if(role !== 'TENANT') throw { msg: 'Role unauthorized!', status: 406 }

        next()
    } catch (error) {
        next(error)
    }
}