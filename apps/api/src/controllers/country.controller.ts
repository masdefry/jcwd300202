import { createCountryService, getCountriesService } from '@/services/country.service'
import { NextFunction, Request, Response } from 'express'

export const getCountries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { countryName, limit = 8 } = req.query

    const getCountriesProcess = await getCountriesService({ countryName: countryName as string, limit: limit as string | number })
    
    res.status(200).json({
      error: false,
      message: 'Get countries success',
      data: {
        countries: getCountriesProcess?.countries,
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
    const { name, description, id, role } = req.body

    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 406 }
    const imagesUploaded: any = req?.files?.images

    const createCountryProcess = await createCountryService({ name, description, id, role, imagesUploaded })
    
    res.status(201).json({
      error: false,
      message: 'Create country success',
      data: createCountryProcess?.createdCountry,
    })
  } catch (error) {
    next(error)
  }
}
