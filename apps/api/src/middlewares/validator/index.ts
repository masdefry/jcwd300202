import { body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const createCountryValidator = [
  body(['id', 'role', 'name', 'description'])
    .notEmpty()
    .withMessage('Id, Role, Name, and Description Name field required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name length must between 3 and 100 characters!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('description')
    .isString()
    .isLength({ min: 10, max: 180 })
    .withMessage('Description length must between 10 and 180 characters!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)

      if (errorResult.isEmpty() === false) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createCityValidator = [
  body(['id', 'role', 'countryId', 'cityName'])
    .notEmpty()
    .withMessage('Id, Role, Country ID, and Name field required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('countryId').isString().escape(),
  body('cityName')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name length must between 3 and 100 characters!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)

      if (errorResult.isEmpty() === false) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createPropertyValidator = [
  body([
    'id',
    'role',
    'cityId',
    'countryId',
    'name',
    'zipCode',
    'address',
    'location',
    'checkInStartTime',
    'checkOutEndTime',
    'totalRooms',
    'propertyTypeId',
    'propertyDescription',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),

  body('id').isString().escape(),
  body('role').isString().escape(),
  body('cityId').isString().escape(),
  body('countryId').isString().escape(),
  body('name')
    .isString()
    .isLength({ min: 8, max: 180 })
    .withMessage('Name length must be between 8 and 180 characters!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('zipCode').isString().escape(),
  body('address').isString().escape(),
  body('location').isURL().withMessage('Invalid URL format'),
  body('star').optional().isString().escape(),

  body('checkInStartTime')
    .isString()
    .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .escape(),
  body('checkInEndTime').optional().isString().escape(),
  body('checkOutStartTime').optional().isString().escape(),
  body('checkOutEndTime')
    .isString()
    .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .escape(),

  body('totalRooms').isString().escape(),
  body('propertyTypeId').isString().escape(),
  body('propertyDescription')
    .isString()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),

  body('neighborhoodDescription')
    .isString()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),

  body('phoneNumber')
    .isString()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number should be between 10 and 15 characters!')
    .escape(),

  body('url').optional().isURL().withMessage('Invalid URL format'),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      console.log(errorResult)
      if (errorResult.isEmpty() === false) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updatePropertyGeneralInfoValidator = [
  body([
    'id',
    'role',
    'cityId',
    'countryId',
    'name',
    'zipCode',
    'address',
    'location',
    'checkInStartTime',
    'checkOutEndTime',
    'phoneNumber',
    'totalRooms',
    'propertyTypeId',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),

  body('id').isString().escape(),
  body('role').isString().escape(),
  body('cityId').isInt().escape(),
  body('countryId').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 8, max: 180 })
    .withMessage('Name length must be between 8 and 180 characters!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('zipCode').isString().escape(),
  body('address').isString().escape(),
  body('location').isURL().withMessage('Invalid URL format'),
  body('star').optional().isInt().escape(),

  body('checkInStartTime')
    .isString()
    .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .escape(),
  body('checkInEndTime').optional().isString().escape(),
  body('checkOutStartTime').optional().isString().escape(),
  body('checkOutEndTime')
    .isString()
    .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
    .escape(),

  body('totalRooms').isInt().escape(),
  body('propertyTypeId').isInt().escape(),

  body('phoneNumber')
    .isString()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number should be between 10 and 15 characters!')
    .escape(),

  body('url').optional().isURL().withMessage('Invalid URL format'),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (errorResult.isEmpty() === false) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updatePropertyDescriptionsValidator = [
  body(['id', 'role', 'propertyDescription'])
    .notEmpty()
    .withMessage('Required fields are missing!'),

  body('id').isString().escape(),
  body('role').isString().escape(),
  body('propertyDescription')
    .isString()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next({ msg: errors.array()[0].msg, status: 406 })
    }
    next()
  },
]

export const userValidator = [
  body(['id', 'role']).notEmpty().withMessage('Id and Role field required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)

      if (errorResult.isEmpty() === false) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const deletePropertyValidator = [
  body(['id', 'role', 'password'])
    .notEmpty()
    .withMessage('Id, Role, and Password fields are required!'),

  body('id').isString().escape(),
  body('role').isString().escape(),
  body('password')
    .isString()
    .isLength({ min: 8, max: 180 })
    .withMessage('Password length must be between 8 and 180 characters!')
    .escape(),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)

      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createPropertyFacilityValidator = [
  body(['id', 'role', 'name'])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updatePropertyRoomTypeGeneralValidator = [
  body([
    'name',
    'totalRooms',
    'rooms',
    'bathrooms',
    'capacity',
    'price',
    'id',
    'role',
    'propertyRoomTypeId',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('totalRooms')
    .isInt({ min: 1 })
    .withMessage('Total rooms must be a positive integer!'),
  body('rooms')
    .isInt({ min: 1 })
    .withMessage('Rooms must be a positive integer!'),
  body('bathrooms')
    .isInt({ min: 1 })
    .withMessage('Bathrooms must be a positive integer!'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer!'),
  body('price')
    .isInt({ min: 0 })
    .withMessage('Price must be a positive number!'),
  body('propertyRoomTypeId').isInt().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createPropertyRoomTypeValidator = [
  body([
    'id',
    'role',
    'name',
    'description',
    'rooms',
    'capacity',
    'bathrooms',
    'price',
    'totalRooms',
    'propertyRoomFacilitiesId',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('description')
    .isString()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('rooms').isString().escape(),
  body('capacity').isString().escape(),
  body('bathrooms').isString().escape(),
  body('price').isString().escape(),
  body('totalRooms').isString().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const deletePropertyTypeValidator = [
  body(['id', 'role', 'propertyTypeId', 'password'])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('propertyTypeId').isInt().escape(),
  body('password')
    .isString()
    .isLength({ min: 8, max: 180 })
    .withMessage('Password must be between 8 and 180 characters long!')
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createSeasonalPriceValidator = [
  body([
    'id',
    'role',
    'roomPrices',
    'roomsToSell',
    'availability',
    'propertyRoomTypeId',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('roomPrices').isInt().escape(),
  body('roomsToSell').isInt().escape(),
  body('availability').isBoolean().escape(),
  body('propertyRoomTypeId').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updateSeasonalPriceValidator = [
  body([
    'id',
    'role',
    'seasonId',
    'seasonalPriceId',
    'roomPrices',
    'roomsToSell',
    'availability',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('seasonId').isInt().escape(),
  body('seasonalPriceId').isInt().escape(),
  body('roomPrices').isInt().escape(),
  body('roomsToSell').isInt().escape(),
  body('availability').isBoolean().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createSeasonalAvailabiltyByPropertyValidator = [
  body([
    'id',
    'role',
    'availability',
    'pricePercentage',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('availability').isBoolean().escape(),
  body('pricePercentage').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updateManySeasonsByPropertySeasonValidator = [
  body([
    'id',
    'role',
    'seasonId',
    'availability',
    'pricePercentage',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('seasonId').isInt().escape(),
  body('availability').isBoolean().escape(),
  body('pricePercentage').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const createOneSeasonValidator = [
  body([
    'id',
    'role',
    'roomPrices',
    'roomsToSell',
    'pricePercentage',
    'availability',
    'propertyRoomTypeId',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('roomPrices').isInt().escape(),
  body('roomsToSell').isInt().escape(),
  body('pricePercentage').isInt().escape(),
  body('availability').isBoolean().escape(),
  body('propertyRoomTypeId').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]

export const updateSingleSeasonValidator = [
  body([
    'id',
    'role',
    'roomPrices',
    'roomsToSell',
    'pricePercentage',
    'availability',
    'propertyRoomTypeId',
    'name',
    'startDate',
    'endDate',
    'isPeak',
  ])
    .notEmpty()
    .withMessage('All fields are required!'),
  body('id').isString().escape(),
  body('role').isString().escape(),
  body('roomPrices').isInt().escape(),
  body('roomsToSell').isInt().escape(),
  body('pricePercentage').isInt().escape(),
  body('availability').isBoolean().escape(),
  body('propertyRoomTypeId').isInt().escape(),
  body('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be between 3 and 100 characters long!')
    .matches(/^[a-zA-Z0-9\s,.'-]*$/)
    .withMessage(
      'Only letters, numbers, spaces, commas, periods, apostrophes, and hyphens are allowed!',
    ),
  body('startDate').isString().escape(),
  body('endDate').isString().escape(),
  body('isPeak').isBoolean().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errorResult = validationResult(req)
      if (!errorResult.isEmpty()) {
        throw { msg: errorResult.array()[0].msg, status: 406 }
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  },
]
