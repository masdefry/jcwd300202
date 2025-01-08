import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

export const getRoomHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body 
        const { propertyRoomTypeId } = req.params
        const { name = '' } = req.query


        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 401 }
        
        const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
            where: {
                id: Number(propertyRoomTypeId)
            }
        })

        if(!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt) throw { msg: 'Room not found!', status: 406 }

        const roomHasFacilities = await prisma.roomHasFacilities.findMany({
            where: {
                AND: [
                    {
                        propertyRoomTypeId: Number(propertyRoomTypeId)
                    },
                    {
                        propertyRoomFacility: {
                            name: {
                                contains: name as string,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                propertyRoomFacility: true
            },
            orderBy: {
                propertyRoomFacility: {
                    name: 'asc'
                }
            }
        })

        const roomNotHasFacilities = await prisma.propertyRoomFacility.findMany({
            where: {
                id: {
                    notIn: roomHasFacilities?.map(item => item?.propertyRoomFacilityId)
                },
                name: {
                    contains: name as string,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            }
        })

        const property = await prisma.property.findUnique({
            where: {
                id: isPropertyRoomTypeExist?.propertyId
            },
            include: {
                propertyRoomType: true
            }
        })
        res.status(200).json({
            error: false,
            message: 'Get room has facilites success',
            data: {
                roomHasFacilities,
                roomNotHasFacilities,
                propertyRoomFacilitiesId: roomHasFacilities.map(item => item?.propertyRoomFacilityId),
                propertyRoomType: isPropertyRoomTypeExist,
                property
            }
        })

    } catch (error) {
        next(error)
    }
}
export const getGeneralRoomHasFacilitiesByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body 
        const { slug } = req.params
        const { name = '' } = req.query

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 401 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }
        
        const isPropertyExist = await prisma.property.findFirst({
            where: {
                slug
            },
            include: {
                propertyRoomType: true
            }
        })

        if(!isPropertyExist?.id || isPropertyExist?.deletedAt) throw { msg: 'Property not found!', status: 406 }

        const getRoomHasFacilitiesId = await prisma.roomHasFacilities.findMany({
            where: {
                AND: [
                    {
                        propertyRoomType: {
                            property: {
                                slug
                            }
                        }
                    },
                    {
                        propertyRoomFacility: {
                            name: {
                                contains: name as string,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                propertyRoomFacility: true
            }
        })

        const roomHasFacilities = await prisma.propertyRoomFacility.findMany({
            where: {
                id: {
                    in: getRoomHasFacilitiesId?.map(item => item?.propertyRoomFacilityId)
                },
                name: {
                    contains: name as string,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            }
        })

        const roomNotHasFacilities = await prisma.propertyRoomFacility.findMany({
            where: {
                id: {
                    notIn: getRoomHasFacilitiesId?.map(item => item?.propertyRoomFacilityId)
                },
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
            message: 'Get room has facilites success',
            data: {
                roomHasFacilities,
                roomNotHasFacilities,
                propertyRoomFacilitiesId: roomHasFacilities.map(item => item?.id),
                property: isPropertyExist,
            }
        })

    } catch (error) {
        next(error)
    }
}

export const updateRoomHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomFacilitiesId, id, role } = req.body
        const { propertyRoomTypeId } = req.params

        if(!Array.isArray(propertyRoomFacilitiesId)) throw { msg: 'Room facilities id invalid!', status: 406}

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 401 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }

        const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
            where: {
                id: Number(propertyRoomTypeId)
            },
            include: {
                property: true
            }
        })

        if(!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt) throw { msg: 'Room not found!', status: 406 }
        if(isPropertyRoomTypeExist?.property?.tenantId !== id) throw { msg: 'Actions not permitted!', status: 401 }

        let dataCreateManyRoomHasFacilities
        await prisma.$transaction(async(tx) => {
            const deleteRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
                where: {
                    propertyRoomTypeId: isPropertyRoomTypeExist?.id,
                }
            })
    
            dataCreateManyRoomHasFacilities = propertyRoomFacilitiesId.map((itm: string | number) => {
                return {
                    propertyRoomTypeId: isPropertyRoomTypeExist?.id,
                    propertyRoomFacilityId: Number(itm)
                }
            })
    
            const createRoomHasFacilities = await tx.roomHasFacilities.createMany({
                data: dataCreateManyRoomHasFacilities
            })

            if(!createRoomHasFacilities) throw { msg: 'Update room facility failed!', status: 500 }
        }, {
            timeout: 15000
        })



        res.status(200).json({
            error: false,
            message: 'Update room facility success',
            data: dataCreateManyRoomHasFacilities
        })

    } catch (error) {
        next(error)
    }
}
export const updateRoomHasFacilitiesByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomFacilitiesId, id, role } = req.body
        const { slug } = req.params

        if(!Array.isArray(propertyRoomFacilitiesId)) throw { msg: 'Room facilities id invalid!', status: 406}

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 401 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }

        const isPropertyExist = await prisma.property.findUnique({
            where: {
                slug
            },
            include: {
                propertyRoomType: true
            }
        })

        if(!isPropertyExist?.id || isPropertyExist?.deletedAt) throw { msg: 'Property not found!', status: 406 }
        if(isPropertyExist?.tenantId !== id) throw { msg: 'Actions not permitted!', status: 401 }

        let dataCreateManyRoomHasFacilities
        await prisma.$transaction(async(tx) => {
            const deleteRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
                where: {
                    propertyRoomTypeId: {
                        in: isPropertyExist?.propertyRoomType.map(item => item?.id)
                    }
                }
            })
    
            const dataCreateManyRoomHasFacilities = isPropertyExist?.propertyRoomType.map(item => {
                return propertyRoomFacilitiesId.map((itm: string | number) => {
                    return {
                        propertyRoomTypeId: item?.id,
                        propertyRoomFacilityId: Number(itm)
                    }
                })
            }).flat()

            const createRoomHasFacilities = await tx.roomHasFacilities.createMany({
                data: dataCreateManyRoomHasFacilities
            })

            if(!createRoomHasFacilities) throw { msg: 'Update room facility failed!', status: 500 }
        }, {
            timeout: 15000
        })



        res.status(200).json({
            error: false,
            message: 'Update room facility success',
            data: dataCreateManyRoomHasFacilities
        })

    } catch (error) {
        next(error)
    }
}