import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

export const getPropertyHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
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
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 406 }
        
        const isPropertyExist = await prisma.property.findFirst({
            where: {
                slug
            }
        })

        if(!isPropertyExist?.id || isPropertyExist?.deletedAt) throw { msg: 'Property not found!', status: 406 }

        const propertyHasFacility = await prisma.propertyHasFacility.findMany({
            where: {
                AND: [
                    {
                        property: {
                            slug,
                            tenantId: id
                        }
                    },
                    {
                        propertyFacility: {
                            name: {
                                contains: name as string,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            include: {
                propertyFacility: true
            },
            orderBy: {
                propertyFacility: {
                    name: 'asc'
                }
            }
        })

        const propertyNotHasFacility = await prisma.propertyFacility.findMany({
            where: {
                id: {
                    notIn: propertyHasFacility?.map(item => item?.propertyFacilityId)
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
            message: 'Get property has facilites success',
            data: {
                propertyHasFacility,
                propertyNotHasFacility,
                propertyFacilitiesId: propertyHasFacility.map(item => item?.propertyFacilityId),
                property: isPropertyExist,
            }
        })

    } catch (error) {
        next(error)
    }
}

export const updatePropertyHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyFacilitiesId, id, role } = req.body
        const { slug } = req.params

        if(!Array.isArray(propertyFacilitiesId)) throw { msg: 'Property facilities id invalid!', status: 406}

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist.role !== role)  throw { msg: 'Role unauthorized!', status: 406 }
        
        const isPropertyExist = await prisma.property.findFirst({
            where: {
                slug
            }
        })
        
        if(!isPropertyExist?.id || isPropertyExist?.deletedAt) throw { msg: 'Property not found!', status: 406 }
        if(isPropertyExist?.tenantId !== id) throw { msg: 'Actions not permitted!', status: 406 }


        const deletePropertyHasFacilities = await prisma.propertyHasFacility.deleteMany({
            where: {
                propertyId: isPropertyExist?.id
            }
        })

        const dataCreateManyPropertyHasFacilities = propertyFacilitiesId.map((itm: string | number) => {
            return {
                propertyId: isPropertyExist?.id,
                propertyFacilityId: Number(itm)
            }
        })

        const createPropertyHasFacilities = await prisma.propertyHasFacility.createMany({
            data: dataCreateManyPropertyHasFacilities
        })

        res.status(200).json({
            error: false,
            message: 'Update property facility success',
            data: dataCreateManyPropertyHasFacilities
        })

    } catch (error) {
        next(error)
    }
}