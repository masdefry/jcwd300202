import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../auth.service/types";

export const getLandingPageDataService = async({ id, role }: Pick<IUser, 'id' | 'role'>) => {

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
            where: {
                deletedAt: null
            },
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
            where: {
                deletedAt: null
            },
            take: 10
        })

        return {
                cities,
                properties,
                propertyTypes,
                transactions,
            }
}