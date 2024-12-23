import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export const getCities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { cityName, limit = 8 } = req.query

        const cities = await prisma.city.findMany({
            where: {
                name: {
                    startsWith: cityName as string,
                    mode: 'insensitive'
                }
            }
        })

        res.status(200).json({
            error: false,
            message: 'Get cities success',
            data: {
                cities
            }
        })
    } catch (error) {
        next(error)
    }
}