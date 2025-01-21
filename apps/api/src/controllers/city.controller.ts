import { createCityService, getCitiesService } from '@/services/city.service'
import { NextFunction, Request, Response } from 'express'

export const getCities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cityName, limit = 8 } = req.query

    const getCitiesProcess = await getCitiesService({
      cityName: cityName as string,
      limit: limit as string,
    })

    res.status(200).json({
      error: false,
      message: 'Get cities success',
      data: {
        cities: getCitiesProcess?.cities,
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
    const { cityName, countryId, id, role } = req.body
    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 404 }
    const imagesUploaded: any = req?.files?.images

    const createCityProcess = await createCityService({
      cityName,
      countryId,
      id,
      role,
      imagesUploaded,
    })

    res.status(201).json({
      error: false,
      message: 'Create city success',
      data: createCityProcess?.createdCity,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
