import { Request, Response, NextFunction } from "express"
import prisma from "@/prisma"

export const getPropertyFacility = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyFacility = await prisma.propertyFacility.findMany({})

        res.status(200).json({
            error: false,
            message: 'Get property facility success',
            data: propertyFacility
        })
    } catch (error) {
        next(error)
    }
}