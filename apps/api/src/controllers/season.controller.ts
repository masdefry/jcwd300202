import prisma from "@/prisma";
import { Response, Request, NextFunction } from "express";
import { addDays, differenceInDays } from "date-fns";
import { error } from "console";

export const createSeasonalPriceAndAvailabilty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, roomPrices, roomsToSell, availability, propertyRoomTypeId, name, startDate, endDate, isPeak } = req.body

        // const isTenantExist = await prisma.tenant.findUnique({
        //     where: {
        //         id
        //     }
        // })

        // if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        // if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }
        // if(!isTenantExist?.isVerified) throw { msg: 'Tenant not verified!', status: 406 }

        const isPropertyExist = await prisma.property.findFirst({
            where: {
                propertyRoomType: {
                    some: {
                        id: Number(propertyRoomTypeId)
                    }
                }
            },
            select: {
                id: true
            }
        })

        if(!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }

        const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
            where: {
                id: Number(propertyRoomTypeId)
            }
        })

        if(!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt) throw { msg: 'Room type not found!', status: 406 }
        if(roomsToSell > isPropertyRoomTypeExist?.totalRooms) throw { msg: 'The number of rooms exceeds the total rooms limit! Change capacity first.', status: 406 }

        let createdSeason : any, createdSeasonalPrice
        await prisma.$transaction(async(tx) => {
            createdSeason = await tx.season.create({
                data: {
                    propertyRoomTypeId,
                    propertyId: isPropertyExist?.id,
                    name,
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                }
            })

            if(!createdSeason?.id) throw { msg: 'Create season failed!', status: 500 }
            
            const dataToCreateSeasonalPrices = Array.from({ length: differenceInDays(new Date(endDate), new Date(startDate)) + 1}).map((_, index) => {
                return {
                    price: roomPrices,
                    propertyId: isPropertyExist?.id,
                    seasonId: createdSeason?.id as number,
                    propertyRoomTypeId,
                    isPeak,
                    roomToRent: roomsToSell,
                    date: new Date((addDays(startDate, index))).toISOString()

                }
            })
            
            createdSeasonalPrice = await tx.seasonalPrice.createMany({
                data: dataToCreateSeasonalPrices
            })


        })

        console.log(createdSeasonalPrice)
        console.log('difference Days:', differenceInDays(new Date(startDate), new Date(endDate)))

        res.status(200).json({
            error: false,
            message: 'Create seasonal price success',
            data: {
                createdSeason,
                createdSeasonalPrice  
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getBulkSeasonalPriceAndAvailability = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomTypeId, startDate, endDate } = req.query

        const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
            where: {
                id: Number(propertyRoomTypeId)
            }
        })

        if(!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt) throw { msg: 'Room type not found!', status: 406 }

        const season = await prisma.season.findFirst({
            where: {
                propertyRoomTypeId: Number(propertyRoomTypeId),
                startDate: {
                    gte: new Date(startDate as string).toISOString()
                },
                endDate: {
                    lte: new Date(startDate as string).toISOString()
                },
                // startDate: new Date(startDate as string).toISOString(),
                // endDate: new Date(endDate as string).toISOString(),
            }
        })

        res.status(200).json({
            error: false,
            message: 'Get seasonal price success',
            data: {

            }
        })
    } catch (error) {
        next(error)
    }
}

export const getSingleSeasonalPriceAndAvailability = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomTypeId, date } = req.query

        const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
            where: {
                id: Number(propertyRoomTypeId)
            }
        })

        if(!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt) throw { msg: 'Room type not found!', status: 406 }

        const season = await prisma.season.findFirst({
            where: {
                propertyRoomTypeId: Number(propertyRoomTypeId),
                startDate: new Date(date as string).toISOString(),
                endDate: new Date(date as string).toISOString(),
            }
        })

        const seasonalPrice = await prisma.seasonalPrice.findFirst({
            where: {
                seasonId: season?.id,
            }
        })

        console.log('seasonalPrice:', seasonalPrice)
        console.log('season:', season?.id)

        res.status(200).json({
            error: false,
            message: 'Get seasonal price success',
            data: {
                season,
                seasonalPrice
            }
        })
    } catch (error) {
        next(error)
    }
}
