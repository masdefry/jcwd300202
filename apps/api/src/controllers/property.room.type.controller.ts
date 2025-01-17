import { Request, Response, NextFunction } from 'express'
import {
  getPropertyRoomTypeService,
  getPropertyRoomTypeByPropertyService,
  updatePropertyRoomTypeGeneralService,
  createPropertyRoomTypeService,
  deletePropertyRoomTypeService,
  getPropertyRoomTypeByTenantService,
  getSinglePropertyRoomTypeByTenantService,
} from '@/services/property.room.type.service'

export const getPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roomTypeId } = req.params

    const getPropertyRoomTypeProcess = await getPropertyRoomTypeService({ roomTypeId })

    res.status(200).json({
      error: false,
      message: 'Get property room type success',
      data: {
        propertyRoomType: getPropertyRoomTypeProcess?.propertyRoomType,
      },
    })
  } catch (error) {
    next(error)
  }
}
export const getSinglePropertyRoomTypeByTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roomTypeId } = req.params
    const { id, role } = req.body

    const getSinglePropertyRoomTypeByTenantProcess = await getSinglePropertyRoomTypeByTenantService({ id, role, roomTypeId })

    res.status(200).json({
      error: false,
      message: 'Get property room type success',
      data: {
        propertyRoomType: getSinglePropertyRoomTypeByTenantProcess?.propertyRoomType,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyRoomTypeByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const {
      limit = '2',
      offset = '0',
      checkInDate,
      checkOutDate,
      adult,
      children,
    } = req.query

    const getPropertyRoomTypeByPropertyProcess =
      await getPropertyRoomTypeByPropertyService({
        limit: limit as string,
        offset: offset as string,
        checkInDate: checkInDate as string,
        checkOutDate: checkOutDate as string,
        adult: adult as string,
        children: children as string,
        slug,
      })

    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
        propertyRoomTypeWithSeasonalPrice:
          getPropertyRoomTypeByPropertyProcess?.propertyRoomTypeWithSeasonalPrice,
        propertyRoomType:
          getPropertyRoomTypeByPropertyProcess?.propertyRoomType,
        isIncludeBreakfast:
          getPropertyRoomTypeByPropertyProcess?.isIncludeBreakfast,
        totalPage: getPropertyRoomTypeByPropertyProcess?.totalPage,
        pageInUse: getPropertyRoomTypeByPropertyProcess?.pageInUse,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyRoomTypeByTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params
    const {
      checkInDate,
      checkOutDate,
      adult,
      children,
    } = req.query

    const getPropertyRoomTypeByTenantProcess =
      await getPropertyRoomTypeByTenantService({
        id,
        role,
        checkInDate: checkInDate as string,
        checkOutDate: checkOutDate as string,
        adult: adult as string,
        children: children as string,
        slug,
      })

    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
        propertyRoomTypeWithSeasonalPrice:
          getPropertyRoomTypeByTenantProcess?.propertyRoomTypeWithSeasonalPrice,
        propertyRoomType:
          getPropertyRoomTypeByTenantProcess?.propertyRoomType,
        isIncludeBreakfast:
          getPropertyRoomTypeByTenantProcess?.isIncludeBreakfast,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyRoomTypeGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      totalRooms,
      rooms,
      bathrooms,
      capacity,
      price,
      id,
      role,
      propertyRoomTypeId,
    } = req.body
    const { slug } = req.params

    const updatePropertyRoomTypeGeneralProcess =
      await updatePropertyRoomTypeGeneralService({
        name,
        totalRooms,
        rooms,
        bathrooms,
        capacity,
        price,
        id,
        role,
        propertyRoomTypeId,
        slug,
      })

    res.status(200).json({
      error: false,
      message: 'Update property room type success',
      data: updatePropertyRoomTypeGeneralProcess?.updatedPropertyRoomTypeGeneral,
    })
  } catch (error) {
    next(error)
  }
}

export const createPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      name,
      description,
      rooms,
      capacity,
      bathrooms,
      price,
      totalRooms,
      propertyRoomFacilitiesId,
    } = req.body

    const { slug } = req.params
    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 404 }
    const imagesUploaded: any = req?.files?.images

    const createPropertyRoomTypeProcess = await createPropertyRoomTypeService({
      id,
      role,
      slug,
      name,
      description,
      rooms,
      capacity,
      bathrooms,
      price,
      totalRooms,
      imagesUploaded,
      propertyRoomFacilitiesId,
    })

    res.status(201).json({
      error: false,
      message: 'Create property room type success',
      data: createPropertyRoomTypeProcess?.createdPropertyRoomType,
    })
  } catch (error) {
    next(error)
  }
}

export const deletePropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, password } = req.body
    const { slug } = req.params
    const { propertyRoomTypeId } = req.query

    await deletePropertyRoomTypeService({
      id,
      role,
      password,
      slug,
      propertyRoomTypeId: propertyRoomTypeId as string,
    })

    res.status(200).json({
      error: false,
      message: 'Delete room type success',
      data: {},
    })
  } catch (err) {
    next(err)
  }
}
