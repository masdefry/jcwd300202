import { Request, Response, NextFunction } from 'express'
import prisma from '@/prisma'

export const getPropertyRoomFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query

    const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
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
      message: 'Get property facilities success',
      data: propertyRoomFacility,
    })
  } catch (error) {
    next(error)
  }
}

export const createPropertyRoomFacility = async (
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

    const isFacilityExist = await prisma.propertyRoomFacility.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })

    if (isFacilityExist.length > 0)
      throw { msg: 'Room facility already exist!', status: 406 }
    
    const createdPropertyRoomFacility =
      await prisma.propertyRoomFacility.create({
        data: {
          name,
          iconDirectory: imagesUploaded[0].destination,
          iconFilename: imagesUploaded[0].filename.split('.')[0],
          iconFileExtension: imagesUploaded[0].filename.split('.')[1],
        },
      })

    if (!createdPropertyRoomFacility?.id)
      throw { msg: 'Create room facility failed!', status: 500 }

    res.status(201).json({
      error: false,
      message: 'Create room facility success',
      data: createdPropertyRoomFacility,
    })
  } catch (error) {
    next(error)
  }
}
