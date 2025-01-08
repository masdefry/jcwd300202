import { Response, Request, NextFunction } from 'express'
import prisma from '@/prisma'

export const getPropertyTypes = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, limit = 5, offset = 0 } = req.query

        if(isNaN(Number(limit))) throw { msg: 'Limit type invalid!', status: 406 }
        if(isNaN(Number(offset))) throw { msg: 'Offset type invalid!', status: 406 }

        const propertyType = await prisma.propertyType.findMany({
            where: {
                name: {
                    contains: name as string || '',
                    mode: 'insensitive'
                }
            },
            orderBy: {
                name: 'asc'
            },
            take: Number(limit),
            skip: Number(offset),
        })

        res.status(200).json({
            error: false,
            message: 'Get property types success',
            data: propertyType
        })
    } catch (error) {
        next(error)
    }
}

export const createPropertyType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, name, description } = req.body


        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(!isTenantExist.isVerified)  throw { msg: 'Tenant not verified!', status: 406 }
        
        const isPropertyTypeExist = await prisma.propertyType.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        })

        if(isPropertyTypeExist?.id) throw { msg: 'Property type already exist!', status: 406 }
        
        const createdPropertyType = await prisma.propertyType.create({
            data: {
                name,
                description
            }
        })

        res.status(201).json({
            error: false,
            message: 'Create property type success',
            data: createdPropertyType
        })

    } catch (error) {
        next(error)
    }
}
