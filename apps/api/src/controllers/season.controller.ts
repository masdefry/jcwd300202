import { Response, Request, NextFunction } from 'express'
import { createOneSeasonService, createSeasonalAvailabiltyByPropertyService, createSeasonalPriceService, deletePropertySeasonService, deleteSeasonalPriceService, deleteSingleSeasonService, getBulkSeasonalPriceAndAvailabilityService, getSeasonsByPropertyRoomTypeService, getSeasonsByPropertyService, getSingleSeasonalPriceAndAvailabilityService, getSingleSeasonService, updateManySeasonsByPropertySeasonService, updateSeasonalPriceService, updateSingleSeasonService } from '@/services/season.service'


export const createSeasonalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      roomPrices,
      roomsToSell,
      availability,
      propertyRoomTypeId,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body
    
    const createSeasonalPriceProcess = await createSeasonalPriceService({ id, role, roomPrices, roomsToSell, availability: JSON.parse(availability), propertyRoomTypeId, name, startDate, endDate, isPeak: JSON.parse(isPeak), })
    

    res.status(201).json({
      error: false,
      message: 'Create seasonal price success',
      data: {
        createdSeason: createSeasonalPriceProcess?.createdSeason,
        createdSeasonalPrice: createSeasonalPriceProcess?.createdSeasonalPrice,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getBulkSeasonalPriceAndAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { startDate, endDate } = req.query
    const { propertyRoomTypeId } = req.params

    const getBulkSeasonalPriceAndAvailabilityProcess = await getBulkSeasonalPriceAndAvailabilityService({ id, role, startDate: startDate as string, endDate: endDate as string, propertyRoomTypeId: Number(propertyRoomTypeId) })
    res.status(200).json({
      error: false,
      message: 'Get seasonal price success',
      data: {
        season: getBulkSeasonalPriceAndAvailabilityProcess?.season,
        seasonalPrice: getBulkSeasonalPriceAndAvailabilityProcess?.seasonalPrice
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleSeasonalPriceAndAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyRoomTypeId, date } = req.query

    const getSingleSeasonalPriceAndAvailabilityProcess = await getSingleSeasonalPriceAndAvailabilityService({ propertyRoomTypeId: Number(propertyRoomTypeId), date: date as string })
    
    res.status(200).json({
      error: false,
      message: 'Get seasonal price success',
      data: {
        season: getSingleSeasonalPriceAndAvailabilityProcess?.season ,
        seasonalPrice: getSingleSeasonalPriceAndAvailabilityProcess?.seasonalPrice 
      },
    })
  } catch (error) {
    next(error)
  }
}
export const updateSeasonalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      seasonId,
      seasonalPriceId,
      roomPrices,
      roomsToSell,
      availability,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

    const { propertyRoomTypeId } = req.params

    const updateSeasonalPriceProcess = await updateSeasonalPriceService({ id, role, seasonId, seasonalPriceId, roomPrices, roomsToSell, availability: JSON.parse(availability), name, startDate, endDate, isPeak: JSON.parse(isPeak), propertyRoomTypeId: Number(propertyRoomTypeId)})
    
    res.status(200).json({
      error: false,
      message: 'Update seasonal price success',
      data: {
        updatedSeason: updateSeasonalPriceProcess?.updatedSeason,
        updatedSeasonalPrice: updateSeasonalPriceProcess?.updatedSeasonalPrice,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getSeasonsByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { month = new Date().getMonth(), year = new Date().getFullYear() } =
      req.query
    const { slug } = req.params

    const getSeasonsByPropertyProcess = await getSeasonsByPropertyService({ id, role, month: month as number, slug, year: year as number })
    
    res.status(200).json({
      error: false,
      message: 'Get seasons by property success',
      data: {
        property: getSeasonsByPropertyProcess?.property,
        seasons: getSeasonsByPropertyProcess?.seasons,
        propertySeasons: getSeasonsByPropertyProcess?.propertySeasons,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createSeasonalAvailabiltyByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      availability,
      pricePercentage,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

    const { slug } = req.params
    
    const createSeasonalAvailabiltyByPropertyProcess = await createSeasonalAvailabiltyByPropertyService({ id, role, availability: JSON.parse(availability), pricePercentage, name, startDate, endDate, isPeak: JSON.parse(isPeak), slug })
    
    res.status(201).json({
      error: false,
      message: 'Create seasonal price success',
      data: {
        createdSeasons: createSeasonalAvailabiltyByPropertyProcess?.createdSeasons,
        createdSeasonalPrices: createSeasonalAvailabiltyByPropertyProcess?.createdSeasonalPrices,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateManySeasonsByPropertySeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      seasonId,
      availability,
      pricePercentage,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

    const { slug } = req.params

    const updateManySeasonsByPropertySeasonProcess = await updateManySeasonsByPropertySeasonService({ id, role, seasonId, availability: JSON.parse(availability), pricePercentage, name, startDate, endDate, isPeak: JSON.parse(isPeak), slug })
    
    res.status(200).json({
      error: false,
      message: 'Update seasonal price success',
      data: {
        updatedSeasons: updateManySeasonsByPropertySeasonProcess?.updatedSeasons,
        updatedSeasonalPrices: updateManySeasonsByPropertySeasonProcess?.updatedSeasonalPrices,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deletePropertySeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const { slug } = req.params
    const { seasonId } = req.query

    const deletePropertySeasonProcess = await deletePropertySeasonService({ id, role, slug, seasonId: Number(seasonId) })

      res.status(200).json({
        error: false,
        message: 'Delete seasons success',
        data: {},
      })
  } catch (error) {
    next(error)
  }
}

export const deleteSeasonalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const { propertyRoomTypeId } = req.params

    const { seasonalPriceId } = req.query

    const deleteSeasonalPriceProcess = await deleteSeasonalPriceService({ id, role, propertyRoomTypeId: Number(propertyRoomTypeId), seasonalPriceId: Number(seasonalPriceId) })

    res.status(200).json({
      error: false,
      message: 'Delete season success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const getSeasonsByPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { month = new Date().getMonth(), year = new Date().getFullYear() } =
      req.query
    const { propertyRoomTypeId } = req.params

    const getSeasonsByPropertyRoomTypeProcess = await getSeasonsByPropertyRoomTypeService({ id, role, month: month as number, propertyRoomTypeId: Number(propertyRoomTypeId), year: year as number })
    
    res.status(200).json({
      error: false,
      message: 'Get seasons by room type success',
      data: {
        property: getSeasonsByPropertyRoomTypeProcess?.property,
        seasons: getSeasonsByPropertyRoomTypeProcess?.seasons,
        propertySeasons: getSeasonsByPropertyRoomTypeProcess?.propertySeasons,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleSeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      roomPrices,
      roomsToSell,
      pricePercentage,
      availability,
      propertyRoomTypeId,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

    const { seasonId } = req.params

    const updateSingleSeasonProcess = await updateSingleSeasonService({ id, role, roomPrices, roomsToSell, pricePercentage, availability: JSON.parse(availability), propertyRoomTypeId, name, startDate, endDate, isPeak: JSON.parse(isPeak), seasonId: Number(seasonId) })
    
    res.status(200).json({
      error: false,
      message: 'Update season room type success',
      data: {
        updatedSeasons: updateSingleSeasonProcess?.updatedSeasons,
        updatedSeasonalPrices: updateSingleSeasonProcess?.updatedSeasonalPrices,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createOneSeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      roomPrices,
      roomsToSell,
      pricePercentage,
      availability,
      propertyRoomTypeId,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

    const createOneSeasonProcess = await createOneSeasonService({ id, role, roomPrices, roomsToSell, pricePercentage, availability: JSON.parse(availability), propertyRoomTypeId, name, startDate, endDate, isPeak: JSON.parse(isPeak) })

    
    res.status(200).json({
      error: false,
      message: 'Create season room type success',
      data: {
        createdSeasons: createOneSeasonProcess?.createdSeasons,
        createdSeasonalPrices: createOneSeasonProcess?.createdSeasonalPrices,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleSeason = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id,
      role
    } = req.body

    const { seasonId } = req.params

    const { propertyRoomTypeId } = req.query

    const deleteSingleSeasonProcess = await deleteSingleSeasonService({ id, role, seasonId: Number(seasonId), propertyRoomTypeId: Number(propertyRoomTypeId) })
    
    res.status(200).json({
      error: false,
      message: 'Delete season room type success',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleSeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { startDate, endDate } =
      req.query
    const { seasonId } = req.params

    const getSingleSeasonProcess = await getSingleSeasonService({ id, role, seasonId: Number(seasonId) })

    res.status(200).json({
      error: false,
      message: 'Get seasons by property success',
      data: {
        property: getSingleSeasonProcess?.property,
        propertySeason: getSingleSeasonProcess?.propertySeason,
      },
    })
  } catch (error) {
    next(error)
  }
}