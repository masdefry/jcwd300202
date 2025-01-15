import { Request, Response, NextFunction } from 'express'
import { createPropertyRoomFacilityService, getPropertyRoomFacilityService } from '@/services/room.facility.service'

export const getPropertyRoomFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.query

    const getPropertyRoomFacilityProcess = await getPropertyRoomFacilityService({name: name as string})

    res.status(200).json({
      error: false,
      message: 'Get property facilities success',
      data: getPropertyRoomFacilityProcess?.propertyRoomFacility,
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

    const createPropertyRoomFacilityProcess = await createPropertyRoomFacilityService({ id, role, name, imagesUploaded })

    
    res.status(201).json({
      error: false,
      message: 'Create room facility success',
      data: createPropertyRoomFacilityProcess?.createdPropertyRoomFacility,
    })
  } catch (error) {
    next(error)
  }
}
