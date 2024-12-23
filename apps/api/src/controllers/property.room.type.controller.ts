import { Request, Response, NextFunction } from 'express';
import { prisma } from "@/connection"; 

export const getPropertyRoomType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const propertyRoomType = await prisma.propertyRoomType.findMany({
            where: {
                id: Number(id)
            },
            include: {
                propertyRoomImage: true,
                roomHasFacilities: {
                    include: {
                        propertyRoomFacility: true
                    }
                }
            },
            orderBy: {
                price: 'asc'
            },
        })

        res.status(200).json({
            error: false,
            message: 'Get property room type success',
            data: {
                propertyRoomType
            }
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}