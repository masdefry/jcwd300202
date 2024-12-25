import { Request, Response, NextFunction } from "express"
import prisma from "@/prisma"

export const getPropertyRoomFacility = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query

        const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
            where: {
                name: {
                    contains: name as string,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            }
        })

        res.status(200).json({
            error: false,
            message: 'Get property facilities success',
            data: propertyRoomFacility
        })
    } catch (error) {
        next(error)
    }
}