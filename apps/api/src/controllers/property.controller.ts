import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidV4 } from 'uuid'
import { getRoomTypeService } from '@/services/property.service/index.bak'
import { deleteFiles } from '@/utils/deleteFiles'
import { addDays, addHours, differenceInDays, format, subDays } from 'date-fns'
import { comparePassword } from '@/utils/hashPassword'
import { createPropertyService, dataForFilteringPropertyService, deletePropertyService, getPropertiesByTenantService, getPropertiesByUserService, getPropertiesService, getPropertyDescriptionsService, getPropertyDetailService, getPropertyRoomTypeByPropertyService, updatePropertyDescriptionsService, updatePropertyGeneralInfoService } from '@/services/property.service'

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      cityId,
      countryId,
      name,
      zipCode,
      address,
      location,
      checkInStartTime,
      checkInEndTime,
      checkOutStartTime,
      checkOutEndTime,
      countPropertyImages,
      propertyTypeId,
      propertyFacilitiesId,
      propertyFacilitiesName,
      propertyImages,
      propertyDescription,
      neighborhoodDescription,
      phoneNumber,
      url,
      totalRooms,
      propertyRoomTypes,
    } = req.body

    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 406 }
    
    const imagesUploaded: any = req?.files?.images

    const createPropertyProcess = await createPropertyService({ id, role, cityId, countryId, name, zipCode, address, location, checkInStartTime, checkInEndTime, checkOutStartTime, checkOutEndTime, countPropertyImages, propertyTypeId, propertyFacilitiesId, propertyDescription, neighborhoodDescription, phoneNumber, url, totalRooms, propertyRoomTypes, imagesUploaded })
    
    res.status(201).json({
      error: false,
      message: 'Create property success',
      data: {
        createdProperty: createPropertyProcess?.createdProperty,
        createdRoomHasFacilities: createPropertyProcess?.createdRoomHasFacilities,
        createdPropertyDetail: createPropertyProcess?.createdPropertyDetail,
        createdPropertyRoomTypes: createPropertyProcess?.createdPropertyRoomTypes,
        createdPropertyHasFacilities: createPropertyProcess?.createdPropertyHasFacilities,
      },
    })
  } catch (error) {
    if (!Array.isArray(req.files)) {
      deleteFiles({ imagesUploaded: req.files })
    }
    next(error)
  }

}

export const getPropertyDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const { checkInDate, checkOutDate, adult, children } = req.query

    const getPropertyDetailProcess = await getPropertyDetailService({ checkInDate: checkInDate as string, checkOutDate: checkOutDate as string, adult: Number(adult), children: Number(children), slug })
   
    res.status(200).json({
      error: false,
      message: 'Get property detail success',
      data: {
        property: getPropertyDetailProcess?.property,
        propertyDetail: getPropertyDetailProcess?.propertyDetail,
        propertyFacilities: getPropertyDetailProcess?.propertyFacilities,
        propertyImages: getPropertyDetailProcess?.propertyImages,
        propertyImagesPreview: getPropertyDetailProcess?.propertyImagesPreview,
        avgRating: getPropertyDetailProcess?.avgRating,
        propertyRoomType: getPropertyDetailProcess?.propertyRoomType,
        dateAndPrice: getPropertyDetailProcess?.dateAndPrice,
        basePrice: getPropertyDetailProcess?.basePrice,
        reviews: getPropertyDetailProcess?.reviews,
        city: getPropertyDetailProcess?.city,
        country: getPropertyDetailProcess?.country,
        propertyListByCity: getPropertyDetailProcess?.propertyListByCity,
        tenant: getPropertyDetailProcess?.tenant,
        isIncludeBreakfast: getPropertyDetailProcess?.isIncludeBreakfast,
        seasonalPrice: getPropertyDetailProcess?.seasonalPrice,
        excludeDate: getPropertyDetailProcess?.excludeDate,
      },
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getPropertyRoomTypeByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyId } = req.params
    const { limit = 2, offset = 0 } = req.query

    const getPropertyRoomTypeByPropertyProcess = await getPropertyRoomTypeByPropertyService({ propertyId, limit: Number(limit), offset: Number(offset) })

    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
        propertyRoomType: getPropertyRoomTypeByPropertyProcess?.propertyRoomType,
        isIncludeBreakfast: getPropertyRoomTypeByPropertyProcess?.isIncludeBreakfast,
        totalPage: getPropertyRoomTypeByPropertyProcess?.totalPage,
        pageInUse: getPropertyRoomTypeByPropertyProcess?.pageInUse,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const dataForFilteringProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const dataForFilteringPropertyProcess = await dataForFilteringPropertyService()
    
    res.status(200).json({
      error: false,
      message: 'Get data for filtering property success',
      data: {
        propertyType: dataForFilteringPropertyProcess?.propertyType,
        propertyFacility: dataForFilteringPropertyProcess?.propertyFacility,
        propertyRoomFacility: dataForFilteringPropertyProcess?.propertyRoomFacility,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      countryId,
      cityId,
      checkInDate,
      checkOutDate,
      minPrice,
      maxPrice,
      adult = 1,
      children = 0,
      limit = 5,
      offset = 0,
      sortBy = 'price',
      order = 'asc',
      ratings,
    } = req.query

    const {
      propertytypeidarr = '',
      propertyfacilityidarr = '',
      propertyroomfacilityidarr = '',
      propertystararr = '',
    } = req.headers

    const getPropertiesProcess = await getPropertiesService({ countryId: Number(countryId), cityId: Number(cityId), checkInDate: checkInDate as string, checkOutDate: checkOutDate as string, minPrice: Number(minPrice), maxPrice: Number(maxPrice), adult: Number(adult), children: Number(children), limit: Number(limit), offset: Number(offset), sortBy: sortBy as string, order: order as string, ratings: ratings as string, propertytypeidarr: propertytypeidarr as string, propertyfacilityidarr: propertyfacilityidarr as string, propertyroomfacilityidarr: propertyroomfacilityidarr as string, propertystararr: propertystararr as string, })

    res.status(200).json({
      error: false,
      message: 'Get properties success',
      data: {
        whereConditionGeneral: getPropertiesProcess?.whereConditionGeneral,
        numberedPropertyFacilityIdArr: getPropertiesProcess?.numberedPropertyFacilityIdArr,
        countProperties: getPropertiesProcess?.countProperties,
        properties: getPropertiesProcess?.properties,
        propertyAvgRating: getPropertiesProcess?.propertyAvgRating,
        totalPage: getPropertiesProcess?.totalPage,
        pageInUse: getPropertiesProcess?.pageInUse,
        propertyTypeCounter: getPropertiesProcess?.propertyTypeCounter,
        dataForFilteringProperty: getPropertiesProcess?.dataForFilteringProperty,
        country: getPropertiesProcess?.country,
        city: getPropertiesProcess?.city,
        countryId: getPropertiesProcess?.countryId,
        cityId: getPropertiesProcess?.cityId,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyDescriptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

    const getPropertyDescriptionsProcess = await getPropertyDescriptionsService({ id, role, slug })

    res.status(200).json({
      error: false,
      message: 'Get property description success',
      data: {
        property: getPropertyDescriptionsProcess?.property,
        propertyRoomType: getPropertyDescriptionsProcess?.propertyRoomType,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyDescriptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const {
      id,
      role,
      propertyDescription,
      neighborhoodDescription,
      propertyRoomType,
    } = req.body

    if (!Array.isArray(propertyRoomType))
      throw { msg: 'Property room type description is missing!', status: 406 }

    const updatePropertyDescriptionsProcess = await updatePropertyDescriptionsService({ id, role, propertyDescription, neighborhoodDescription, propertyRoomType, slug })
    
    res.status(200).json({
      error: false,
      message: 'Update property descriptions success',
      data: {
        propertyDescription: updatePropertyDescriptionsProcess?.propertyDescription,
        neighborhoodDescription: updatePropertyDescriptionsProcess?.neighborhoodDescription,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyRoomTypeId } = req.params

    const result = await getRoomTypeService(Number(propertyRoomTypeId))

    res.status(200).json({
      message: 'Succesfully fetch Room Type',
      error: false,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const getPropertiesByTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { limit = 10, offset = 0, sortBy = 'name', order='asc', filterBy, filterValue, period, name } = req.query
    
    const getPropertiesByTenantProcess = await getPropertiesByTenantService({ limit: Number(limit), offset: Number(offset), sortBy: sortBy as string, order: order as string, filterBy: filterBy as string, filterValue: filterValue as string, period: period as string, name: name as string, id, role })
   
    res.status(200).json({
      error: false,
      message: 'Get properties by tenant success',
      data: {
        properties: getPropertiesByTenantProcess?.properties,
        countProperties: getPropertiesByTenantProcess?.countProperties,
        totalPage: getPropertiesByTenantProcess?.totalPage,
        pageInUse: getPropertiesByTenantProcess?.pageInUse,
        offset: getPropertiesByTenantProcess?.offset,
        reservation: getPropertiesByTenantProcess?.reservation,
        arrival: getPropertiesByTenantProcess?.arrival,
        departure: getPropertiesByTenantProcess?.departure,
        totalReview: getPropertiesByTenantProcess?.totalReview,
        cancellation: getPropertiesByTenantProcess?.cancellation,
      },
    })
  } catch (error) { 
    next(error)
  }
}

export const getPropertiesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const getPropertiesByUserProcess = await getPropertiesByUserService({ id, role })

    res.status(200).json({
      error: false,
      message: 'Get properties by user success',
      data: {
        propertyByRecentBooks: getPropertiesByUserProcess?.propertyByRecentBooks,
        propertyByHistoryView: getPropertiesByUserProcess?.propertyByHistoryView,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyGeneralInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const {
      id,
      role,
      name,
      address,
      zipCode,
      location,
      cityId,
      countryId,
      checkInStartTime,
      checkInEndTime,
      checkOutStartTime,
      checkOutEndTime,
      star,
      phoneNumber,
      url,
    } = req.body

    const updatePropertyGeneralInfoProcess = await updatePropertyGeneralInfoService({ id, role, name, address, zipCode, location, cityId, countryId, checkInStartTime, checkInEndTime, checkOutStartTime, checkOutEndTime, star, phoneNumber, url, slug })
   
    res.status(200).json({
      error: false,
      message: 'Update property general info success',
      data: {
        updatedProperty: updatePropertyGeneralInfoProcess?.updatedProperty,
        updatedPropertyDetail: updatePropertyGeneralInfoProcess?.updatedPropertyDetail,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProperty = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role, password } = req.body
    const { slug } = req.params

    const deletePropertyProcess = await deletePropertyService({ id, role, password, slug })
    
    res.status(200).json({
      error: false,
      message: 'Delete property success',
      data: {}
    })

  } catch (err) {
    next(err)
  }
}