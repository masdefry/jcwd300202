import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export const getLandingPageData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
        let cities, user;

        
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
        
        const properties = await prisma.property.findMany({
            take: 20,
            include: {
                city: true,
                country: true,
                propertyRoomType: {
                    orderBy: {
                        price: 'asc'
                    }
                },
                propertyDetail: {
                    include: {
                        propertyImage: true
                    }
                },
                propertyType: true,
                review: true
            }
        })

        cities = await prisma.city.findMany({
            take: 5,
            include: {
                country: true
            }
        })

        const propertyTypes = await prisma.propertyType.findMany({
            take: 10
        })

        res.status(200).json({
            error: false,
            message: 'Get landing page data success',
            data: {
                cities,
                properties,
                propertyTypes,
                transactions,
            }
        })

    } catch (error) {
        next(error)
    }
}