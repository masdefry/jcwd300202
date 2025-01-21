import prisma from '@/prisma'
import { getPropertyHasFacilitiesService, updatePropertyHasFacilitiesService } from '@/services/property.has.facility.service'
import { Request, Response, NextFunction } from 'express'

export const getPropertyHasFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params
    const { name = '' } = req.query

    const getPropertyHasFacilitiesProcess = await getPropertyHasFacilitiesService({ id, role, slug, name: name as string })
    
    res.status(200).json({
      error: false,
      message: 'Get property has facilites success',
      data: {
        propertyHasFacility: getPropertyHasFacilitiesProcess?.propertyHasFacility,
        propertyNotHasFacility: getPropertyHasFacilitiesProcess?.propertyNotHasFacility,
        propertyFacilitiesId: getPropertyHasFacilitiesProcess?.propertyFacilitiesId,
        property: getPropertyHasFacilitiesProcess?.property
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyHasFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyFacilitiesId, id, role } = req.body
    const { slug } = req.params

    if (!Array.isArray(propertyFacilitiesId))
      throw { msg: 'Property facilities id invalid!', status: 406 }

    const updatePropertyHasFacilitiesProcess = await updatePropertyHasFacilitiesService({ propertyFacilitiesId, id, role, slug })

    res.status(200).json({
      error: false,
      message: 'Update property facility success',
      data: updatePropertyHasFacilitiesProcess?.dataCreateManyPropertyHasFacilities,
    })
  } catch (error) {
    next(error)
  }
}
