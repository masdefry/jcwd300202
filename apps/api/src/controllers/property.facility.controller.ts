import { Request, Response, NextFunction } from 'express'
import prisma from '@/prisma'

export const getPropertyFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query
    const propertyFacility = await prisma.propertyFacility.findMany({
      where: {
        name: {
          contains: name as string,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    res.status(200).json({
      error: false,
      message: 'Get property facility success',
      data: propertyFacility,
    })
  } catch (error) {
    next(error)
  }
}

export const createPropertyFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, name } = req.body

    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 406 }
    const imagesUploaded: any = req?.files?.images

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const createdPropertyFacility = await prisma.propertyFacility.create({
      data: {
        name,
        iconDirectory: imagesUploaded[0].destination,
        iconFilename: imagesUploaded[0].filename.split('.')[0],
        iconFileExtension: imagesUploaded[0].filename.split('.')[0],
      },
    })

    if (!createdPropertyFacility?.id)
      throw { msg: 'Create property facility failed!', status: 500 }

    res.status(201).json({
      error: false,
      message: 'Create property facility success',
      data: createdPropertyFacility,
    })
  } catch (error) {
    next(error)
  }
}
