import { Request, Response, NextFunction } from 'express'
import prisma from '@/prisma'
import {
  createPropertyFacilityService,
  getPropertyFacilityService,
} from '@/services/property.facility.service'

export const getPropertyFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query

    const getPropertyFacilityProcess = await getPropertyFacilityService({
      name: name as string,
    })

    res.status(200).json({
      error: false,
      message: 'Get property facility success',
      data: getPropertyFacilityProcess?.propertyFacility,
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
      throw { msg: 'Images not found!', status: 404 }
    const imagesUploaded: any = req?.files?.images

    const createdPropertyFacilityProcess = await createPropertyFacilityService({
      id,
      role,
      name,
      imagesUploaded,
    })
    res.status(201).json({
      error: false,
      message: 'Create property facility success',
      data: createdPropertyFacilityProcess?.createdPropertyFacility,
    })
  } catch (error) {
    next(error)
  }
}
