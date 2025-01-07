import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'

export const getCountries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { countryName, limit = 8 } = req.query

    const countries = await prisma.country.findMany({
      where: {
        name: {
          contains: countryName as string,
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
      message: 'Get countries success',
      data: {
        countries,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createCountry = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { countryName, description, id, role } = req.body

    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 406 }
    const imagesUploaded: any = req?.files?.images

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

    const createdCountry = await prisma.country.create({
        data: {
            name: countryName,
            description,
            directory: imagesUploaded[0].destination,
            filename: imagesUploaded[0].filename.split('.')[0],
            fileExtension: imagesUploaded[0].filename.split('.')[0],
        }
    })

    if(!createdCountry?.id) throw { msg: 'Create country failed!', status: 500 }

    res.status(201).json({
        error: false,
        message: 'Create country success',
        data: createdCountry
    })
  } catch (error) {
    next(error)
  }
}
