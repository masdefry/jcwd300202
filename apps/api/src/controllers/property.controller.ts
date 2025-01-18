import { NextFunction, Request, Response } from 'express'
import { deleteFiles } from '@/utils/deleteFiles'
import {
  createPropertyService,
  getRoomTypeService,
  dataForFilteringPropertyService,
  deletePropertyService,
  getPropertiesByTenantService,
  getPropertiesByUserService,
  getPropertiesService,
  getPropertyDescriptionsService,
  getPropertyDetailService,
  getPropertyRoomTypeByPropertyService,
  updatePropertyDescriptionsService,
  updatePropertyGeneralInfoService,
} from '@/services/property.service'
import prisma from '@/prisma'
import { addDays, addHours } from 'date-fns'

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
      propertyDescription,
      neighborhoodDescription,
      phoneNumber,
      url,
      totalRooms,
      propertyRoomTypes,
    } = req.body

    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 404 }

    const imagesUploaded: any = req?.files?.images

    const createPropertyProcess = await createPropertyService({
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
      propertyDescription,
      neighborhoodDescription,
      phoneNumber,
      url,
      totalRooms,
      propertyRoomTypes,
      imagesUploaded,
    })

    res.status(201).json({
      error: false,
      message: 'Create property success',
      data: {
        createdProperty: createPropertyProcess?.createdProperty,
        createdRoomHasFacilities:
          createPropertyProcess?.createdRoomHasFacilities,
        createdPropertyDetail: createPropertyProcess?.createdPropertyDetail,
        createdPropertyRoomTypes:
          createPropertyProcess?.createdPropertyRoomTypes,
        createdPropertyHasFacilities:
          createPropertyProcess?.createdPropertyHasFacilities,
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

    const getPropertyDetailProcess = await getPropertyDetailService({
      checkInDate: checkInDate as string,
      checkOutDate: checkOutDate as string,
      adult: Number(adult),
      children: Number(children),
      slug,
    })

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

    const getPropertyRoomTypeByPropertyProcess =
      await getPropertyRoomTypeByPropertyService({
        propertyId,
        limit: Number(limit),
        offset: Number(offset),
      })

    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
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

export const dataForFilteringProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dataForFilteringPropertyProcess =
      await dataForFilteringPropertyService()

    res.status(200).json({
      error: false,
      message: 'Get data for filtering property success',
      data: {
        propertyType: dataForFilteringPropertyProcess?.propertyType,
        propertyFacility: dataForFilteringPropertyProcess?.propertyFacility,
        propertyRoomFacility:
          dataForFilteringPropertyProcess?.propertyRoomFacility,
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
      name = '',
      type,
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

    let numberedPropertyFacilityIdArr,
      numberedPropertyRoomFacilityIdArr,
      numberedPropertyTypeIdArr,
      numberedPropertyStarArr
    let propertyFacilityFromPrisma, propertyRoomFacilityFromPrisma
    let city, country

    let typeId: null | number = null
    let typeName = ''
    if (type) {
      const getTypeId = await prisma.propertyType.findFirst({
        where: {
          name: {
            contains: type as string,
            mode: 'insensitive',
          },
        },
      })
      if (getTypeId?.id) {
        typeName = getTypeId?.name
        typeId = getTypeId?.id as number
      }
    }

    let gteDate = new Date()
    gteDate.setHours(0, 0, 0, 0)
    let ltDate = addDays(gteDate, 1)
    ltDate.setHours(0, 0, 0, 0)

    let whereConditionDate = {}

    if (isNaN(gteDate.getTime()) || isNaN(ltDate.getTime())) {
      throw { msg: 'Date range invalid!', status: 406 }
    } else {
      whereConditionDate = {
        ...whereConditionDate,
        gte: gteDate.toISOString(),
        lt: ltDate.toISOString(),
      }
    }

    if (countryId && !isNaN(Number(countryId))) {
      country = await prisma.country.findUnique({
        where: {
          id: Number(countryId),
        },
      })
      if (cityId && !isNaN(Number(cityId))) {
        city = await prisma.city.findUnique({
          where: {
            id: Number(cityId),
          },
        })
      }
    }

    if (!sortBy) throw { msg: 'Sort parameter not found!', status: 404 }
    if (propertyfacilityidarr) {
      const propertyFacilityIdStr = propertyfacilityidarr as string
      numberedPropertyFacilityIdArr = propertyFacilityIdStr.split(',')
      numberedPropertyFacilityIdArr = numberedPropertyFacilityIdArr.map(
        (item) => Number(item),
      )
      propertyFacilityFromPrisma = await prisma.propertyFacility.findMany({
        where: {
          id: {
            notIn: numberedPropertyFacilityIdArr,
          },
        },
        select: {
          id: true,
        },
      })
    }
    if (propertyroomfacilityidarr) {
      const propertyRoomFacilityIdStr = propertyroomfacilityidarr as string
      numberedPropertyRoomFacilityIdArr = propertyRoomFacilityIdStr.split(',')
      numberedPropertyRoomFacilityIdArr = numberedPropertyRoomFacilityIdArr.map(
        (item) => Number(item),
      )
      propertyRoomFacilityFromPrisma =
        await prisma.propertyRoomFacility.findMany({
          where: {
            id: {
              notIn: numberedPropertyRoomFacilityIdArr,
            },
          },
          select: {
            id: true,
          },
        })
    }
    if (propertytypeidarr || typeId) {
      const propertyTypeIdStr = propertytypeidarr as string
      numberedPropertyTypeIdArr = propertyTypeIdStr.split(',')
      numberedPropertyTypeIdArr = numberedPropertyTypeIdArr.map((item) =>
        Number(item),
      )
      if (typeId) numberedPropertyTypeIdArr.push(Number(typeId))
    }
    if (propertystararr) {
      const propertyStarStr = propertystararr as string
      numberedPropertyStarArr = propertyStarStr.split(',')
      numberedPropertyStarArr = numberedPropertyStarArr.map((item) =>
        Number(item),
      )
    }

    const whereConditionPropertyRoomFacility =
      propertyroomfacilityidarr &&
      numberedPropertyRoomFacilityIdArr &&
      numberedPropertyRoomFacilityIdArr.length > 0
        ? numberedPropertyRoomFacilityIdArr.map((item) => ({
            propertyRoomType: {
              some: {
                roomHasFacilities: {
                  some: {
                    propertyRoomFacilityId: item,
                  },
                },
              },
            },
          }))
        : []

    const whereConditionPropertyFacility =
      propertyfacilityidarr &&
      numberedPropertyFacilityIdArr &&
      numberedPropertyFacilityIdArr.length > 0
        ? numberedPropertyFacilityIdArr.map((item) => ({
            propertyHasFacility: {
              some: {
                propertyFacilityId: item,
              },
            },
          }))
        : []

    const whereConditionGeneral: any = [
      {
        deletedAt: null,
      },
      name 
      ? {
          name: {
            contains: name as string,
            mode: 'insensitive'
          }
        }
        : null,
      countryId && !isNaN(Number(countryId))
        ? {
            countryId: Number(countryId),
          }
        : null,
      cityId && !isNaN(Number(cityId))
        ? {
            cityId: Number(cityId),
          }
        : null,
      minPrice &&
      !isNaN(Number(minPrice)) &&
      maxPrice &&
      !isNaN(Number(maxPrice))
        ? {
            propertyRoomType: {
              some: {
                price: {
                  gte: Number(minPrice),
                  lte: Number(maxPrice),
                },
              },
            },
          }
        : null,
      adult && !isNaN(Number(adult))
        ? {
            propertyRoomType: {
              some: {
                capacity: {
                  gte: Number(children) + Number(adult),
                  lte: Number(children) + Number(adult) + 2,
                },
              },
            },
          }
        : null,
      (propertytypeidarr &&
        numberedPropertyTypeIdArr &&
        numberedPropertyTypeIdArr.length > 0) ||
      (typeId && !isNaN(Number(typeId)))
        ? {
            propertyType: {
              id: {
                in: numberedPropertyTypeIdArr,
              },
            },
          }
        : null,
      propertystararr &&
      numberedPropertyStarArr &&
      numberedPropertyStarArr.length > 0
        ? {
            star: {
              in: numberedPropertyStarArr,
            },
          }
        : null,
    ]
      .filter(Boolean)
      .filter((item) => item?.countryId !== null)
      .filter((item) => item?.cityId !== null)

    const whereCondition =
      [
        ...whereConditionGeneral,
        ...whereConditionPropertyFacility,
        ...whereConditionPropertyRoomFacility,
      ].length > 0
        ? {
            AND: [
              ...whereConditionGeneral,
              ...whereConditionPropertyFacility,
              ...whereConditionPropertyRoomFacility,
            ].filter(Boolean),
          }
        : {}
    let properties, propertiesWithoutLimit, sortedProperties, sortedPropertiesId

    if (
      (countryId && checkInDate && checkOutDate) ||
      propertytypeidarr ||
      propertyfacilityidarr ||
      propertyroomfacilityidarr
    ) {
      propertiesWithoutLimit = await prisma.property.findMany({
        where: whereCondition,
        include: {
          propertyRoomType: {
            orderBy: {
              price: 'asc',
            },
          },
        },
        orderBy: {
          name: order === 'desc' ? 'desc' : 'asc',
        },
      })
      if (
        minPrice &&
        !isNaN(Number(minPrice)) &&
        maxPrice &&
        !isNaN(Number(maxPrice))
      ) {
        propertiesWithoutLimit = propertiesWithoutLimit.filter(
          (item) => item.propertyRoomType[0].price >= Number(minPrice),
        )
      }
      if (sortBy === 'name') {
        sortedProperties = await prisma.property.findMany({
          where: {
            id: {
              in: propertiesWithoutLimit.map((item) => item?.id),
            },
          },
          select: {
            id: true,
            propertyRoomType: {
              orderBy: {
                price: 'asc',
              },
            },
          },
          orderBy: {
            name: order === 'desc' ? 'desc' : 'asc',
          },
          take: Number(limit),
          skip: Number(offset),
        })
        sortedPropertiesId = sortedProperties?.map((item) => item.id)
      } else {
        const getPropertiesId = await prisma.property.findMany({
          where: {
            id: {
              in: propertiesWithoutLimit.map((item) => item?.id),
            },
          },
          select: {
            id: true,
            propertyRoomType: {
              orderBy: {
                price: 'asc',
              },
            },
          },
        })
        sortedProperties = await prisma.propertyRoomType.groupBy({
          where: {
            propertyId: {
              in: getPropertiesId.map((item) => item?.id),
            },
          },
          by: ['propertyId'],
          orderBy: {
            _min: {
              price: order === 'desc' ? 'desc' : 'asc',
            },
          },
          take: Number(limit),
          skip: Number(offset),
        })
        sortedPropertiesId = sortedProperties?.map((item) => item.propertyId)
      }
      properties = await prisma.property.findMany({
        where: {
          id: {
            in: sortedPropertiesId,
          },
        },
        include: {
          propertyRoomType: {
            orderBy: {
              price: 'asc',
            },
            include: {
              seasonalPrice: {
                where: {
                  date: whereConditionDate,
                },
              },
            },
          },
          propertyType: true,
          propertyHasFacility: {
            include: {
              propertyFacility: true,
            },
          },
          city: true,
          country: true,
          propertyDetail: {
            include: {
              propertyImage: true,
            },
          },
          review: true,
        },
        orderBy: {
          name: order === 'desc' ? 'desc' : 'asc',
        },
      })
    } else {
      propertiesWithoutLimit = await prisma.property.findMany({
        include: {
          propertyRoomType: {
            orderBy: {
              price: 'asc',
            },
          },
        },
        orderBy: {
          name: order === 'desc' ? 'desc' : 'asc',
        },
      })
      if (
        minPrice &&
        !isNaN(Number(minPrice)) &&
        maxPrice &&
        !isNaN(Number(maxPrice))
      ) {
        propertiesWithoutLimit = propertiesWithoutLimit.filter(
          (item) => item.propertyRoomType[0].price >= Number(minPrice),
        )
      }
      if (sortBy === 'name') {
        sortedProperties = await prisma.property.findMany({
          select: {
            id: true,
            propertyRoomType: {
              orderBy: {
                price: 'asc',
              },
            },
          },
          orderBy: {
            name: order === 'desc' ? 'desc' : 'asc',
          },
          take: Number(limit),
          skip: Number(offset),
        })
        sortedPropertiesId = sortedProperties?.map((item) => item.id)
        if (
          minPrice &&
          !isNaN(Number(minPrice)) &&
          maxPrice &&
          !isNaN(Number(maxPrice))
        ) {
          sortedPropertiesId = sortedProperties
            .filter(
              (item) => item.propertyRoomType[0].price >= Number(minPrice),
            )
            .map((item) => item.id)
        }
      } else {
        let whereConditionSortedProperties = {}
        if (
          minPrice &&
          !isNaN(Number(minPrice)) &&
          maxPrice &&
          !isNaN(Number(maxPrice))
        ) {
          whereConditionSortedProperties = {
            ...whereConditionSortedProperties,
            price: {
              gte: Number(minPrice),
              lte: Number(maxPrice),
            },
          }
        }
        sortedProperties = await prisma.propertyRoomType.groupBy({
          where: whereConditionSortedProperties,
          by: ['propertyId'],
          orderBy: {
            _min: {
              price: order === 'desc' ? 'desc' : 'asc',
            },
          },
          take: Number(limit),
          skip: Number(offset),
        })
        sortedPropertiesId = sortedProperties?.map((item) => item.propertyId)
      }

      properties = await prisma.property.findMany({
        where: {
          id: {
            in: sortedPropertiesId,
          },
        },
        include: {
          propertyRoomType: {
            orderBy: {
              price: 'asc',
            },
            include: {
              seasonalPrice: {
                where: {
                  date: whereConditionDate,
                },
              },
            },
          },
          propertyType: true,
          propertyHasFacility: {
            include: {
              propertyFacility: true,
            },
          },
          city: true,
          country: true,
          propertyDetail: {
            include: {
              propertyImage: true,
            },
          },
          review: true,
        },
        orderBy: {
          name: order === 'desc' ? 'desc' : 'asc',
        },
      })
    }

    if (sortBy !== 'price') {
    } else {
      if (order === 'desc') {
        properties = properties.sort(
          (a, b) => b.propertyRoomType[0].price - a.propertyRoomType[0].price,
        )
      } else {
        properties = properties.sort(
          (a, b) => a.propertyRoomType[0].price - b.propertyRoomType[0].price,
        )
      }
    }

    properties = properties.map((item) => {
      let availability = true
      let checkAvailability = item?.propertyRoomType?.filter(
        (item) =>
          item?.seasonalPrice[0]?.roomAvailability === false ||
          item?.seasonalPrice[0]?.roomToRent <= 0,
      )

      if (checkAvailability?.length === item?.propertyRoomType?.length)
        availability = false
      const reviewsByProperty = item?.review
        ?.filter((itm) => !isNaN(Number(itm?.rating)))
        .map((itm) => itm?.rating)

      let totalRating
      if (reviewsByProperty.length > 0) {
        totalRating = reviewsByProperty.reduce(
          (acc: any, curr: any) => acc + curr,
        )
      }

      return {
        ...item,
        availability,
        avgRating: totalRating
          ? Number(totalRating) / reviewsByProperty.length
          : 0,
      }
    })

    const propertyAvgRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        propertyId: {
          in: properties.map((item) => item.id),
        },
      },
    })

    const propertyType = await prisma.propertyType.findMany({
      where: {
        id: {
          in: propertiesWithoutLimit.map(
            (item) => item.propertyTypeId,
          ) as number[],
        },
      },
    })

    const propertyTypeCounter = await prisma.propertyType.count({
      where: {
        id: {
          in: propertiesWithoutLimit.map(
            (item) => item.propertyTypeId,
          ) as number[],
        },
      },
    })

    const propertyFacility = await prisma.propertyFacility.findMany({
      where: {
        propertyHasFacility: {
          some: {
            propertyId: {
              in: propertiesWithoutLimit.map((item) => item.id),
            },
          },
        },
      },
    })

    const propertyFacilityCounter = await prisma.propertyFacility.count({
      where: {
        propertyHasFacility: {
          some: {
            propertyId: {
              in: propertiesWithoutLimit.map((item) => item.id),
            },
          },
        },
      },
    })

    const propertyRoomTypeId = propertiesWithoutLimit
      .map((item) => item.propertyRoomType.map((itm) => itm.id))
      .flat()

    const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
      where: {
        roomHasFacilities: {
          some: {
            propertyRoomTypeId: {
              in: propertyRoomTypeId,
            },
          },
        },
      },
    })

    const propertyRoomFacilityCounter = await prisma.propertyRoomFacility.count(
      {
        where: {
          roomHasFacilities: {
            some: {
              propertyRoomTypeId: {
                in: propertyRoomTypeId,
              },
            },
          },
        },
      },
    )

    const countPropertyWith2Star = await prisma.property.count({
      where: {
        id: {
          in: propertiesWithoutLimit.map((item) => item?.id),
        },
        star: 2,
      },
    })

    const countPropertyWith3Star = await prisma.property.count({
      where: {
        id: {
          in: propertiesWithoutLimit.map((item) => item?.id),
        },
        star: 3,
      },
    })

    const countPropertyWith4Star = await prisma.property.count({
      where: {
        id: {
          in: propertiesWithoutLimit.map((item) => item?.id),
        },
        star: 4,
      },
    })

    const countPropertyWith5Star = await prisma.property.count({
      where: {
        id: {
          in: propertiesWithoutLimit.map((item) => item?.id),
        },
        star: 5,
      },
    })

    res.status(200).json({
      error: false,
      message: 'Get properties success',
      data: {
        whereConditionGeneral,
        numberedPropertyFacilityIdArr,
        countProperties: propertiesWithoutLimit.length,
        properties,
        propertyAvgRating,
        totalPage: Math.ceil(propertiesWithoutLimit.length / Number(limit)),
        pageInUse: Number(offset) / Number(limit) + 1,
        propertyTypeCounter,
        dataForFilteringProperty: {
          propertyType,
          propertyTypeCounter,
          propertyFacility,
          propertyFacilityCounter,
          propertyRoomFacility,
          propertyRoomFacilityCounter,
          countPropertyWithStar: [
            countPropertyWith5Star,
            countPropertyWith4Star,
            countPropertyWith3Star,
            countPropertyWith2Star,
          ],
        },
        country: country?.name ? country : {name: typeName},
        city,
        countryId,
        cityId,
      },
    })
  } catch (error: any) {
    console.log(error)
    next(error)
  }
}
// export const getProperties = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const {
//       countryId,
//       cityId,
//       checkInDate,
//       checkOutDate,
//       minPrice,
//       maxPrice,
//       adult = 1,
//       children = 0,
//       limit = 5,
//       offset = 0,
//       sortBy = 'price',
//       order = 'asc',
//       ratings,
//     } = req.query

//     const {
//       propertytypeidarr = '',
//       propertyfacilityidarr = '',
//       propertyroomfacilityidarr = '',
//       propertystararr = '',
//     } = req.headers

//     const getPropertiesProcess = await getPropertiesService({ countryId: Number(countryId), cityId: Number(cityId), checkInDate: checkInDate as string, checkOutDate: checkOutDate as string, minPrice: Number(minPrice), maxPrice: Number(maxPrice), adult: Number(adult), children: Number(children), limit: Number(limit), offset: Number(offset), sortBy: sortBy as string, order: order as string, ratings: ratings as string, propertytypeidarr: propertytypeidarr as string, propertyfacilityidarr: propertyfacilityidarr as string, propertyroomfacilityidarr: propertyroomfacilityidarr as string, propertystararr: propertystararr as string, })

//     res.status(200).json({
//       error: false,
//       message: 'Get properties success',
//       data: {
//         whereConditionGeneral: getPropertiesProcess?.whereConditionGeneral,
//         numberedPropertyFacilityIdArr: getPropertiesProcess?.numberedPropertyFacilityIdArr,
//         countProperties: getPropertiesProcess?.countProperties,
//         properties: getPropertiesProcess?.properties,
//         propertyAvgRating: getPropertiesProcess?.propertyAvgRating,
//         totalPage: getPropertiesProcess?.totalPage,
//         pageInUse: getPropertiesProcess?.pageInUse,
//         propertyTypeCounter: getPropertiesProcess?.propertyTypeCounter,
//         dataForFilteringProperty: getPropertiesProcess?.dataForFilteringProperty,
//         country: getPropertiesProcess?.country,
//         city: getPropertiesProcess?.city,
//         countryId: getPropertiesProcess?.countryId,
//         cityId: getPropertiesProcess?.cityId,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const getPropertyDescriptions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

    const getPropertyDescriptionsProcess = await getPropertyDescriptionsService(
      { id, role, slug },
    )

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

    const updatePropertyDescriptionsProcess =
      await updatePropertyDescriptionsService({
        id,
        role,
        propertyDescription,
        neighborhoodDescription,
        propertyRoomType,
        slug,
      })

    res.status(200).json({
      error: false,
      message: 'Update property descriptions success',
      data: {
        propertyDescription:
          updatePropertyDescriptionsProcess?.propertyDescription,
        neighborhoodDescription:
          updatePropertyDescriptionsProcess?.neighborhoodDescription,
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

    const result = await getRoomTypeService({
      propertyRoomTypeId: Number(propertyRoomTypeId),
    })

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
    const {
      limit = 10,
      offset = 0,
      sortBy = 'name',
      order = 'asc',
      filterBy,
      filterValue,
      period,
      name,
    } = req.query

    console.log('>>>>>>')
    console.log(req.query)
    const getPropertiesByTenantProcess = await getPropertiesByTenantService({
      limit: Number(limit),
      offset: Number(offset),
      sortBy: sortBy as string,
      order: order as string,
      filterBy: filterBy as string,
      filterValue: filterValue as string,
      period: period as string,
      name: name as string,
      id,
      role,
    })

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

    const getPropertiesByUserProcess = await getPropertiesByUserService({
      id,
      role,
    })

    res.status(200).json({
      error: false,
      message: 'Get properties by user success',
      data: {
        propertyByRecentBooks:
          getPropertiesByUserProcess?.propertyByRecentBooks,
        propertyByHistoryView:
          getPropertiesByUserProcess?.propertyByHistoryView,
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

    const updatePropertyGeneralInfoProcess =
      await updatePropertyGeneralInfoService({
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
        slug,
      })

    res.status(200).json({
      error: false,
      message: 'Update property general info success',
      data: {
        updatedProperty: updatePropertyGeneralInfoProcess?.updatedProperty,
        updatedPropertyDetail:
          updatePropertyGeneralInfoProcess?.updatedPropertyDetail,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, password } = req.body
    const { slug } = req.params

    await deletePropertyService({
      id,
      role,
      password,
      slug,
    })

    res.status(200).json({
      error: false,
      message: 'Delete property success',
      data: {},
    })
  } catch (err) {
    next(err)
  }
}

