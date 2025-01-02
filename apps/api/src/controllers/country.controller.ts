import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export const getCountries = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { countryName, limit = 8 } = req.query

        const countries = await prisma.country.findMany({
            where: {
                name: {
                    contains: countryName as string,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            },
            take: Number(limit)
        })

        res.status(200).json({
            error: false,
            message: 'Get countries success',
            data: {
                countries
            }
        })
    } catch (error) {
        next(error)
    }
}