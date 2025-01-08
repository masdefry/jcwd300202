import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cityName, limit = 8 } = req.query

    const cities = await prisma.city.findMany({
      where: {
        name: {
          contains: cityName as string,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
      take: Number(limit),
    })

    res.status(200).json({
      error: false,
      message: 'Get cities success',
      data: {
        cities,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createCity = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cityName, countryId, description, id, role } = req.body

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

    const createdCity = await prisma.city.create({
      data: {
        name: cityName,
        countryId: Number(countryId),
        directory: imagesUploaded[0].destination,
        filename: imagesUploaded[0].filename.split('.')[0],
        fileExtension: imagesUploaded[0].filename.split('.')[0],
      },
    })

    if (!createdCity?.id) throw { msg: 'Create city failed!', status: 500 }

    res.status(201).json({
      error: false,
      message: 'Create city success',
      data: createdCity,
    })
  } catch (error) {
    next(error)
  }
}
