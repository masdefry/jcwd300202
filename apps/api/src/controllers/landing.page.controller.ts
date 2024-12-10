import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export const getLandingPageData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let cities;

        const transactions = await prisma.transaction.groupBy({
            by: 'propertyId',
            _sum: {
                total: true
            },
            orderBy: {
                _sum: {
                    total: 'desc'
                }
            }
        })
        
        // if(transactions.length <= 0) {
        //     const citiesId = await prisma.property.groupBy({
        //         by: ['cityId'],
        //         where: {
        //             id: {
        //                 in: transactions.map(item => item.propertyId)
        //             } 
        //         }
        //     })
    
        //     cities = await prisma.city.findMany({
        //         where: {
        //             id: {
        //                 in: citiesId.map(item => item.cityId)
        //             }
        //         }
        //     })
        // } else {
        // }
        
        cities = await prisma.city.findMany({
            take: 5,
            include: {
                country: true
            }
        })

        const properties = await prisma.property.findMany({
            take: 10
        })

        res.status(200).json({
            error: false,
            message: 'Get landing page data success',
            data: {
                cities,
                properties,
                transactions
            }
        })

    } catch (error) {
        next(error)
    }
}