import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidV4 } from 'uuid'
import { deleteFiles } from '@/utils/deleteFiles'
import { addDays, addHours, differenceInDays, format, subDays } from 'date-fns'
import { comparePassword } from '@/utils/hashPassword'
import { IProperty, IPropertyDetail } from './types'
import { ITransaction } from '../transaction.service/types'
import { IUser } from '../auth.service/types'

export const createPropertyService = async ({
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
}: Partial<IProperty> &
  Partial<IPropertyDetail> & {
    name: string
    role: string
    countPropertyImages: number | string
    propertyFacilitiesId: any
    propertyRoomTypes: any
    imagesUploaded: any
  }) => {
    console.log("SERVICEEEEEEEEEEEEEEEEEEEEEEEE")
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const uuid = uuidV4()
  const propertyId = uuid
  const slug = `${name.toLowerCase().split(' ').join('-')}-${propertyId}`

  let createdProperty: any,
    createdPropertyHasFacilities,
    createdPropertyDetail: any,
    createdPropertyRoomTypes: any,
    createdRoomHasFacilities
  await prisma.$transaction(
    async (tx) => {
      createdProperty = await tx.property.create({
        data: {
          id: propertyId,
          name: name as string,
          countryId: Number(countryId),
          cityId: Number(cityId),
          tenantId: id,
          propertyTypeId: Number(propertyTypeId),
          checkInStartTime: new Date(
            new Date().toISOString().split('T')[0] +
              'T' +
              checkInStartTime +
              ':00',
          ),
          checkInEndTime: checkInEndTime
            ? new Date(
                new Date().toISOString().split('T')[0] +
                  'T' +
                  checkInEndTime +
                  ':00',
              )
            : null,
          checkOutStartTime: checkOutStartTime
            ? new Date(
                new Date().toISOString().split('T')[0] +
                  'T' +
                  checkOutStartTime +
                  ':00',
              )
            : null,
          checkOutEndTime: new Date(
            new Date().toISOString().split('T')[0] +
              'T' +
              checkOutEndTime +
              ':00',
          ),
          slug,
          location: location as string,
          zipCode: zipCode as string,
          address: address as string,
        },
      })

      createdPropertyHasFacilities = await tx.propertyHasFacility.createMany({
        data: JSON.parse(propertyFacilitiesId).map(
          (item: { id: string | number }) => {
            return {
              propertyId,
              propertyFacilityId: Number(item?.id),
            }
          },
        ),
      })

      createdPropertyDetail = await tx.propertyDetail.create({
        data: {
          propertyId: createdProperty?.id,
          propertyDescription: propertyDescription as string,
          neighborhoodDescription: neighborhoodDescription as string,
          phoneNumber: phoneNumber as string,
          url,
          totalRooms: Number(totalRooms),
        },
      })

      const copiedImagesUploaded = [...imagesUploaded]
      const imagesForProperty: any = []
      console.log(countPropertyImages)
      for (let i = 0; i < Number(countPropertyImages); i++) {
        imagesForProperty.push({
          propertyDetailId: createdPropertyDetail?.id,
          filename: copiedImagesUploaded[i]?.filename.split('.')[0],
          fileExtension: copiedImagesUploaded[i]?.filename.split('.')[1],
          directory: copiedImagesUploaded[i]?.destination,
        })
      }
      copiedImagesUploaded.splice(0, Number(countPropertyImages))

      createdPropertyRoomTypes = await tx.propertyRoomType.createManyAndReturn({
        data: JSON.parse(propertyRoomTypes).map((item: any) => {
          return {
            propertyId: createdProperty?.id,
            name: item?.name,
            description: item?.description,
            rooms: item?.rooms,
            capacity: item?.capacity,
            bathrooms: item?.bathrooms,
            price: item?.price,
            totalRooms: item?.totalRooms,
          }
        }),
      })

      createdRoomHasFacilities = await tx.roomHasFacilities.createMany({
        data: JSON.parse(propertyRoomTypes)
          .map((item: any, index: number) => {
            const roomFacilities = item?.roomFacilities.map((itm: any) => {
              return {
                propertyRoomTypeId: createdPropertyRoomTypes[index].id,
                propertyRoomFacilityId: itm,
              }
            })
            return roomFacilities
          })
          .flat(),
      })

      const createdPropertyImages = await tx.propertyImage.createMany({
        data: imagesForProperty,
      })

      const imagesForRooms: any = []
      const propertyRoomTypesFromBody = JSON.parse(propertyRoomTypes)

      JSON.parse(propertyRoomTypes).forEach((item: any, index: number) => {
        for (let i = 0; i < item?.countRoomImages; i++) {
          imagesForRooms.push({
            propertyRoomTypeId: createdPropertyRoomTypes[index].id,
            filename: copiedImagesUploaded[i].filename.split('.')[0],
            fileExtension: copiedImagesUploaded[i].filename.split('.')[1],
            directory: copiedImagesUploaded[i].destination,
          })
        }
      })

      const createdRoomImages = await tx.propertyRoomImage.createMany({
        data: imagesForRooms,
      })
    },
    {
      timeout: 60000,
    },
  )

  return {
    createdProperty,
    createdRoomHasFacilities,
    createdPropertyDetail,
    createdPropertyRoomTypes,
    createdPropertyHasFacilities,
  }
}

export const getPropertyDetailService = async ({
  checkInDate,
  checkOutDate,
  adult,
  children,
  slug,
}: Pick<IProperty, 'slug'> &
  Pick<ITransaction, 'adult' | 'children'> & {
    checkInDate: string
    checkOutDate: string
  }) => {
  const property = await prisma.property.findFirst({
    where: {
      slug: slug as string,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
      propertyRoomType: {
        include: {
          seasonalPrice: true,
        },
        where: {
          deletedAt: null,
        },
      },
    },
  })

  if (!property?.id) throw { msg: 'Property not found!', status: 404 }
  console.log('checkInDate', checkInDate)
  let gteDate =
    checkInDate && checkInDate !== 'undefined'
      ? new Date(checkInDate as string)
      : new Date()
  gteDate.setHours(0, 0, 0, 0)
  let ltDate =
    checkOutDate && checkOutDate !== 'undefined'
      ? new Date(checkOutDate as string)
      : addDays(gteDate, 365)
  ltDate.setHours(0, 0, 0, 0)

  let dataPeriod = {}
  if (isNaN(gteDate.getTime()) || isNaN(ltDate.getTime())) {
    throw { msg: 'Date range invalid!', status: 406 }
  } else {
    dataPeriod = {
      gte: gteDate.toISOString(),
      lt: ltDate.toISOString(),
    }
  }

  const propertyHasFacilities = await prisma.propertyHasFacility.findMany({
    where: {
      propertyId: property?.id,
    },
  })

  const propertyFacilities = await prisma.propertyFacility.findMany({
    where: {
      id: {
        in: propertyHasFacilities.map((item) => item.propertyFacilityId),
      },
    },
  })

  const propertyImages = await prisma.propertyImage.findMany({
    where: {
      propertyDetailId: property.propertyDetail?.id,
    },
  })

  const propertyRoomImages = await prisma.propertyRoomImage.findMany({
    where: {
      propertyRoomTypeId: {
        in: property.propertyRoomType.map((item) => item.id),
      },
      propertyRoomType: {
        deletedAt: null,
      },
    },
  })

  const propertyRoomType = await prisma.propertyRoomType.findMany({
    where: {
      propertyId: property?.id,
      deletedAt: null,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
  })

  const reviews = await prisma.review.findMany({
    where: {
      propertyId: property.id,
    },
    include: {
      user: true,
    },
  })

  let filteredReviewWithRating = reviews.filter(
    (item) => item?.rating && !isNaN(item?.rating),
  )
  let totalRatings: number | null = 0
  if (filteredReviewWithRating.length > 0) {
    totalRatings = filteredReviewWithRating
      .map((item) => item?.rating)
      .reduce((acc: any, curr: any) => acc + curr)
  }

  const city = await prisma.city.findUnique({
    where: {
      id: property?.cityId as number,
    },
  })

  const country = await prisma.city.findUnique({
    where: {
      id: property?.countryId as number,
    },
  })

  const propertyListByCity = await prisma.property.findMany({
    where: {
      cityId: property?.cityId,
      id: {
        not: property?.id,
      },
      deletedAt: null,
    },
    include: {
      country: true,
      city: true,
      review: true,
      propertyDetail: {
        include: {
          propertyImage: true,
        },
      },
      propertyRoomType: {
        orderBy: {
          price: 'asc',
        },
      },
    },
    take: 10,
  })

  const tenant = await prisma.tenant.findUnique({
    where: {
      id: property?.tenantId as string,
      deletedAt: null,
    },
  })

  const generalFacilities = await prisma.roomHasFacilities.findMany({
    where: {
      propertyRoomFacility: {},
    },
  })

  const roomHasBreakfast = await prisma.roomHasFacilities.findMany({
    where: {
      propertyRoomTypeId: {
        in: propertyRoomType.map((item) => item.id),
      },
      propertyRoomFacility: {
        name: 'Breakfast',
      },
    },
    orderBy: {
      propertyRoomType: {
        price: 'asc',
      },
    },
    include: {
      propertyRoomFacility: true,
    },
  })

  const roomHasBreakfastId = roomHasBreakfast.map(
    (item) => item.propertyRoomTypeId,
  )
  const isIncludeBreakfast = propertyRoomType.map((item) => {
    if (roomHasBreakfastId.includes(item.id)) {
      return true
    } else {
      return false
    }
  })

  const seasonalPrice = await prisma.seasonalPrice.findMany({
    where: {
      propertyId: property?.id,
      date: {
        gte: checkInDate
          ? new Date(checkInDate as string).toISOString()
          : new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
            ).toISOString(),
        lt: checkOutDate
          ? new Date(checkOutDate as string).toISOString()
          : addDays(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
              ),
              1,
            ).toISOString(),
      },
    },
  })
  // const transactions = await prisma.transactionStatus.findMany({
  //   where: {
  //     AND: [
  //       {
  //         transaction: {
  //           propertyId: property?.id,
  //         },
  //       },
  //       {
  //         status: {
  //           in: ['PAID', 'WAITING_FOR_CONFIRMATION_PAYMENT'],
  //         },
  //       },
  //     ],
  //     roomFilled: {
  //       some: {
  //         date: dataPeriod
  //       },
  //     },
  //   },
  //   include: {
  //     transaction: {
  //       include: {
  //         room: true,
  //       },
  //     },
  //   },
  // })
  const countReservedRooms = await prisma.roomFilled.groupBy({
    where: {
      propertyId: property?.id,
    },
    by: ['date', 'propertyRoomTypeId'],
    _count: {
      propertyRoomTypeId: true,
    },
  })

  let excludeDate: any = []
  property.propertyRoomType[0].seasonalPrice.forEach((season) => {
    countReservedRooms.forEach((item) => {
      item.date
    })
    let isAllRoomAvailable = true
    if (!season.roomAvailability) {
      property.propertyRoomType.forEach((room) => {
        const findIdx = room.seasonalPrice.findIndex(
          (item) => item.date === season.date && !item.roomAvailability,
        )
        if (findIdx > -1) isAllRoomAvailable = false
      })
    }
    if (!isAllRoomAvailable) excludeDate.push(season.date)
  })
  // property.propertyRoomType

  const getAllSeasonalPriceByCheapestRoomType =
    await prisma.seasonalPrice.findMany({
      where: {
        propertyRoomTypeId: propertyRoomType[0]?.id,
      },
    })

  const dateAndPrice = getAllSeasonalPriceByCheapestRoomType.map((item) => {
    return [format(new Date(item?.date), 'yyyy-MM-dd'), item?.price]
  })

  const propertyRoomTypeWithSeasonalPrice = propertyRoomType.map(
    (item, index) => {
      let totalPrice = 0
      const seasonalPriceByPropertyRoomTypeLength = seasonalPrice.filter(
        (itm) => itm?.propertyRoomTypeId === item?.id,
      ).length
      let seasonalPriceByPropertyRoomType = 0
      if (seasonalPriceByPropertyRoomTypeLength > 0) {
        seasonalPriceByPropertyRoomType = seasonalPrice
          .filter((itm) => itm?.propertyRoomTypeId === item?.id)
          .map((itm) => itm.price)
          .reduce((acc, curr) => acc + curr)
      }
      let totalDays = 1
      if (checkInDate && checkOutDate) {
        totalDays = Math.abs(
          differenceInDays(checkInDate as string, checkOutDate as string),
        )
      }
      totalPrice =
        (totalDays - seasonalPriceByPropertyRoomTypeLength) * item.price +
        seasonalPriceByPropertyRoomType
      return {
        ...item,
        totalPrice,
        totalDays,
        seasonalPriceByPropertyRoomType,
      }
    },
  )
  return {
    property,
    propertyDetail: property.propertyDetail,
    propertyFacilities,
    propertyImages: [...propertyImages, ...propertyRoomImages],
    propertyImagesPreview: [...propertyImages, ...propertyRoomImages].slice(
      0,
      8,
    ),
    avgRating: (totalRatings as number) / filteredReviewWithRating?.length,
    propertyRoomType,
    dateAndPrice: Object.fromEntries(dateAndPrice),
    basePrice: propertyRoomType[0]?.price,
    reviews,
    city,
    country,
    propertyListByCity,
    tenant,
    isIncludeBreakfast,
    seasonalPrice,
    excludeDate,
  }
}

export const getPropertyRoomTypeByPropertyService = async ({
  propertyId,
  limit,
  offset,
}: {
  propertyId: string
  limit: string | number
  offset: string | number
}) => {
  const propertyRoomType = await prisma.propertyRoomType.findMany({
    where: {
      propertyId,
      deletedAt: null,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
    take: Number(limit),
    skip: Number(offset),
  })

  const getAllRooms = await prisma.propertyRoomType.findMany({
    where: {
      propertyId,
      deletedAt: null,
    },
  })

  const totalPage = Math.ceil(getAllRooms.length / Number(limit))

  const roomHasBreakfast = await prisma.roomHasFacilities.findMany({
    where: {
      propertyRoomTypeId: {
        in: propertyRoomType.map((item) => item.id),
      },
      propertyRoomFacility: {
        name: 'Breakfast',
      },
    },
    orderBy: {
      propertyRoomType: {
        price: 'asc',
      },
    },
    include: {
      propertyRoomFacility: true,
    },
  })

  const roomHasBreakfastId = roomHasBreakfast.map(
    (item) => item.propertyRoomTypeId,
  )
  const isIncludeBreakfast = propertyRoomType.map((item) => {
    if (roomHasBreakfastId.includes(item.id)) {
      return true
    } else {
      return false
    }
  })

  const pageInUse = Number(offset) / 2 + 1

  return {
    propertyRoomType,
    isIncludeBreakfast,
    totalPage,
    pageInUse,
  }
}

export const dataForFilteringPropertyService = async () => {
  const propertyType = await prisma.propertyType.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          property: true,
        },
      },
    },
  })

  const propertyFacility = await prisma.propertyFacility.findMany({
    include: {
      _count: {
        select: {
          propertyHasFacility: true,
        },
      },
    },
  })

  const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
    include: {
      _count: {
        select: {
          roomHasFacilities: true,
        },
      },
    },
  })

  return {
    propertyType,
    propertyFacility,
    propertyRoomFacility,
  }
}

export const getPropertiesService = async ({
  countryId,
  cityId,
  checkInDate,
  checkOutDate,
  minPrice,
  maxPrice,
  adult,
  children,
  limit,
  offset,
  sortBy,
  order,
  ratings,
  propertytypeidarr,
  propertyfacilityidarr,
  propertyroomfacilityidarr,
  propertystararr,
}: {
  checkInDate: string | null
  checkOutDate: string | null
  minPrice: string | number
  maxPrice: string | number
  limit: number
  offset: number
  sortBy: string
  order: string
  ratings: string
  propertytypeidarr: string
  propertyfacilityidarr: string
  propertyroomfacilityidarr: string
  propertystararr: string
} & Pick<ITransaction, 'adult' | 'children'> &
  Pick<IProperty, 'cityId' | 'countryId'>) => {
  let numberedPropertyFacilityIdArr,
    numberedPropertyRoomFacilityIdArr,
    numberedPropertyTypeIdArr,
    numberedPropertyStarArr
  let propertyFacilityFromPrisma, propertyRoomFacilityFromPrisma
  let city, country

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
    numberedPropertyFacilityIdArr = numberedPropertyFacilityIdArr.map((item) =>
      Number(item),
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
    propertyRoomFacilityFromPrisma = await prisma.propertyRoomFacility.findMany(
      {
        where: {
          id: {
            notIn: numberedPropertyRoomFacilityIdArr,
          },
        },
        select: {
          id: true,
        },
      },
    )
  }
  if (propertytypeidarr) {
    const propertyTypeIdStr = propertytypeidarr as string
    numberedPropertyTypeIdArr = propertyTypeIdStr.split(',')
    numberedPropertyTypeIdArr = numberedPropertyTypeIdArr.map((item) =>
      Number(item),
    )
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

  // const whereConditionLocation = [

  // ].filter(item => Object.keys(item).length)

  const whereConditionGeneral: any = [
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
    {
      deletedAt: null,
    },
    minPrice && !isNaN(Number(minPrice)) && maxPrice && !isNaN(Number(maxPrice))
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
    propertytypeidarr &&
    numberedPropertyTypeIdArr &&
    numberedPropertyTypeIdArr.length > 0
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
          deletedAt: null,
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
          deletedAt: null,
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
        // AND: [...whereCondition, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility],
        id: {
          in: sortedPropertiesId,
        },
        deletedAt: null,
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
      where: {
        deletedAt: null,
      },
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
          deletedAt: null,
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
      if (
        minPrice &&
        !isNaN(Number(minPrice)) &&
        maxPrice &&
        !isNaN(Number(maxPrice))
      ) {
        sortedPropertiesId = sortedProperties
          .filter((item) => item.propertyRoomType[0].price >= Number(minPrice))
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
        deletedAt: null,
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
      deletedAt: null,
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

  const propertyRoomFacilityCounter = await prisma.propertyRoomFacility.count({
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

  const countPropertyWith2Star = await prisma.property.count({
    where: {
      id: {
        in: propertiesWithoutLimit.map((item) => item?.id),
      },
      deletedAt: null,
      star: 2,
    },
  })

  const countPropertyWith3Star = await prisma.property.count({
    where: {
      id: {
        in: propertiesWithoutLimit.map((item) => item?.id),
      },
      deletedAt: null,
      star: 3,
    },
  })

  const countPropertyWith4Star = await prisma.property.count({
    where: {
      id: {
        in: propertiesWithoutLimit.map((item) => item?.id),
      },
      deletedAt: null,
      star: 4,
    },
  })

  const countPropertyWith5Star = await prisma.property.count({
    where: {
      id: {
        in: propertiesWithoutLimit.map((item) => item?.id),
      },
      deletedAt: null,
      star: 5,
    },
  })
  return {
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
    country,
    city,
    countryId,
    cityId,
  }
}

export const getPropertyDescriptionsService = async ({
  id,
  role,
  slug,
}: Pick<IUser, 'id' | 'role'> & Pick<IProperty, 'slug'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const getProperty = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
      propertyType: true,
      city: true,
      country: true,
    },
  })
  if (!getProperty?.id) throw { msg: 'Property not found!', status: 404 }

  const getPropertyRoomType = await prisma.propertyRoomType.findMany({
    where: {
      propertyId: getProperty?.id,
      deletedAt: null,
    },
  })

  if (getPropertyRoomType.length <= 0)
    throw { msg: 'Property room type not found!', status: 404 }

  return {
    property: getProperty,
    propertyRoomType: getPropertyRoomType,
  }
}

export const updatePropertyDescriptionsService = async ({
  id,
  role,
  propertyDescription,
  neighborhoodDescription,
  propertyRoomType,
  slug,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> &
  Pick<IPropertyDetail, 'propertyDescription' | 'neighborhoodDescription'> & {
    propertyRoomType: any
  }) => {
  if (!Array.isArray(propertyRoomType))
    throw { msg: 'Property room type description is missing!', status: 406 }

  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const dataForUpdatePropertyDescriptions = {
    propertyDescription,
    neighborhoodDescription,
  }

  const updatedPropertyDescriptions = await prisma.propertyDetail.update({
    where: {
      id: isPropertyExist?.propertyDetail?.id,
    },
    data: {
      propertyDescription,
      neighborhoodDescription,
    },
  })

  propertyRoomType.forEach(async (item) => {
    if (item?.description) {
      await prisma.propertyRoomType.update({
        where: {
          id: item?.id,
        },
        data: {
          description: item?.description,
        },
      })
    }
  })

  return {
    propertyDescription,
    neighborhoodDescription,
  }
}

export const getRoomTypeService = async ({
  propertyRoomTypeId,
}: {
  propertyRoomTypeId: number
}) => {
  const room = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
    },
    select: {
      name: true,
      description: true,
      rooms: true,
      capacity: true,
      bathrooms: true,
      price: true,
      totalRooms: true,
    },
  })
}

export const getPropertiesByTenantService = async ({
  limit,
  offset,
  sortBy,
  order,
  filterBy,
  filterValue,
  period,
  name,
  id,
  role,
}: Pick<IUser, 'id' | 'role'> & {
  limit: number
  offset: number
  sortBy: string
  order: string
  filterBy: string
  filterValue: string
  period: string
  name: string
}) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })
  if (order !== 'asc' && order !== 'desc')
    throw { msg: 'Order by value invalid!', status: 406 }

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  let gteDate = subDays(new Date(), Number(period) || 30)
  gteDate.setHours(0, 0, 0, 0)
  let ltDate = addDays(gteDate, Number(period) || 30)
  ltDate.setHours(0, 0, 0, 0)

  let dataPeriod = {}
  if (isNaN(gteDate.getTime()) || isNaN(ltDate.getTime())) {
    throw { msg: 'Date range invalid!', status: 406 }
  } else {
    dataPeriod = {
      gte: gteDate.toISOString(),
      lt: ltDate.toISOString(),
    }
  }
  let getPropertiesId

  if (sortBy === 'name' || sortBy === 'review') {
    getPropertiesId = await prisma.property.findMany({
      where: {
        tenantId: isTenantExist?.id,
        deletedAt: null,
        name: {
          contains: (name as string) || '',
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: order === 'desc' ? 'desc' : 'asc',
      },
    })
  } else if (sortBy === 'booked') {
    getPropertiesId = await prisma.property.findMany({
      where: {
        tenantId: isTenantExist?.id,
        deletedAt: null,
        name: {
          contains: (name as string) || '',
          mode: 'insensitive',
        },
        transaction: {
          some: {
            transactionStatus: {
              some: {
                status: 'PAID',
              },
            },
            // createdAt: dataPeriod
          },
        },
      },
      orderBy: {
        transaction: {
          _count: order === 'desc' ? 'desc' : 'asc',
        },
      },
    })
  } else if (sortBy === 'cancellation') {
    getPropertiesId = await prisma.property.findMany({
      where: {
        tenantId: isTenantExist?.id,
        deletedAt: null,
        name: {
          contains: (name as string) || '',
          mode: 'insensitive',
        },
        transaction: {
          some: {
            transactionStatus: {
              some: {
                status: 'CANCELLED',
              },
            },
            // createdAt: dataPeriod
          },
        },
      },
      orderBy: {
        transaction: {
          _count: order === 'desc' ? 'desc' : 'asc',
        },
      },
    })
  } else {
    getPropertiesId = await prisma.property.findMany({
      where: {
        tenantId: isTenantExist?.id,
        deletedAt: null,
        name: {
          contains: (name as string) || '',
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }
  let orderBy: any = {
    name: 'asc',
  }
  if (sortBy === 'name') {
    orderBy = {
      name: order === 'desc' ? 'desc' : 'asc',
    }
  } else if (sortBy === 'booked') {
    orderBy = {
      transaction: {
        _count: order === 'desc' ? 'desc' : 'asc',
      },
    }
  } else if (sortBy === 'cancellation') {
    orderBy = {
      transaction: {
        _count: order === 'desc' ? 'desc' : 'asc',
      },
    }
  }
  const getLeftProperties = await prisma.property.findMany({
    where: {
      tenantId: isTenantExist?.id,
      deletedAt: null,
      name: {
        contains: (name as string) || '',
        mode: 'insensitive',
      },
      id: {
        notIn: getPropertiesId.map((item) => item?.id),
      },
    },
    orderBy: {
      name: 'desc',
    },
    include: {
      propertyRoomType: {
        include: {
          seasonalPrice: {
            where: {
              date: dataPeriod,
            },
          },
        },
      },
    },
  })
  const getSortedAndFilterredProperties = await prisma.property.findMany({
    where: {
      id: {
        in: getPropertiesId.map((item) => item?.id),
      },
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          seasonalPrice: {
            where: {
              // date: addHours(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 7).toISOString()
              date: dataPeriod,
            },
          },
        },
      },
    },
    orderBy,
  })

  if (order === 'asc' && sortBy !== 'name') {
    getSortedAndFilterredProperties.reverse()
  }

  const getAllProperties = [
    ...getSortedAndFilterredProperties,
    ...getLeftProperties,
  ]

  if (sortBy !== 'name' && order === 'asc') {
    getAllProperties.reverse()
  }

  const getProperties = [...getAllProperties]
  const getTransactionsPaid = await prisma.transactionStatus.findMany({
    where: {
      AND: [
        {
          transaction: {
            tenantId: isTenantExist?.id,
          },
        },
        {
          status: 'PAID',
        },
        {
          createdAt: dataPeriod,
        },
      ],
    },
    include: {
      transaction: true,
    },
  })

  const countPropertiesByTenant = await prisma.property.count({
    where: {
      tenantId: id,
      deletedAt: null,
    },
  })

  const getTransactionsCancelled = await prisma.transactionStatus.findMany({
    where: {
      AND: [
        {
          transaction: {
            tenantId: isTenantExist?.id,
          },
        },
        {
          status: 'CANCELLED',
        },
        {
          createdAt: dataPeriod,
        },
      ],
    },
    include: {
      transaction: true,
    },
  })

  const reviews = await prisma.review.findMany({
    where: {
      AND: [
        {
          property: {
            tenantId: isTenantExist?.id,
          },
        },
      ],
    },
  })

  let addedDataGetProperties = getProperties!.map((item, index) => {
    let availability = true
    let checkAvailability = item?.propertyRoomType?.filter(
      (item) =>
        item?.seasonalPrice[0]?.roomAvailability === false ||
        item?.seasonalPrice[0]?.roomToRent <= 0,
    )

    if (checkAvailability?.length === item?.propertyRoomType?.length)
      availability = false

    const totalBooked = getTransactionsPaid.filter(
      (itm) => itm?.transaction?.propertyId === item?.id,
    ).length
    const totalCancelled = getTransactionsCancelled.filter(
      (itm) => itm?.transaction?.propertyId === item?.id,
    ).length
    const reviewsByProperty = reviews
      .filter((itm) => itm?.propertyId === item?.id)
      .map((itm) => {
        if (!isNaN(Number(itm?.rating))) {
          return itm?.rating
        } else {
          return 0
        }
      })
    let totalRating
    if (reviewsByProperty.length > 0) {
      totalRating = reviewsByProperty.reduce(
        (acc: any, curr: any) => acc + curr,
      )
    }
    return {
      ...item,
      totalBooked,
      availability,
      totalCancelled,
      avgRating: totalRating
        ? Number(totalRating) / reviewsByProperty.length
        : 0,
    }
  })
  let totalPage = Math.ceil(countPropertiesByTenant / Number(limit))
  const pageInUse = Number(offset) / Number(limit) + 1

  if (sortBy === 'review') {
    if (order === 'asc') {
      addedDataGetProperties.sort((a, b) => a.avgRating - b.avgRating)
    } else if (order === 'desc') {
      addedDataGetProperties.sort((a, b) => b.avgRating - a.avgRating)
    }
  }

  if (filterBy === 'open') {
    addedDataGetProperties = addedDataGetProperties.filter(
      (item) => item.availability,
    )
    totalPage = Math.ceil(addedDataGetProperties.length / Number(limit))
  } else if (filterBy === 'close') {
    addedDataGetProperties = addedDataGetProperties.filter(
      (item) => !item.availability,
    )
    totalPage = Math.ceil(addedDataGetProperties.length / Number(limit))
  }

  const totalReview = await prisma.review.count({
    where: {
      property: {
        tenantId: isTenantExist?.id,
      },
      createdAt: dataPeriod,
    },
  })
  const reservation = await prisma.transaction.count({
    where: {
      property: {
        tenantId: isTenantExist?.id,
      },
      transactionStatus: {
        some: {
          status: 'PAID',
          createdAt: dataPeriod,
        },
      },
    },
  })
  const cancellation = await prisma.transaction.count({
    where: {
      property: {
        tenantId: isTenantExist?.id,
      },
      transactionStatus: {
        some: {
          status: 'CANCELLED',
        },
      },
      updatedAt: dataPeriod,
    },
  })
  const arrival = await prisma.transaction.count({
    where: {
      property: {
        tenantId: isTenantExist?.id,
      },
      transactionStatus: {
        some: {
          status: 'PAID',
        },
      },
      checkInDate: dataPeriod,
    },
  })
  const departure = await prisma.transaction.count({
    where: {
      property: {
        tenantId: isTenantExist?.id,
      },
      transactionStatus: {
        some: {
          status: 'PAID',
        },
      },
      checkOutDate: dataPeriod,
    },
  })
  console.log('period', period)

  return {
    properties: addedDataGetProperties.slice(
      Number(offset),
      Number(limit) + Number(offset),
    ),
    countProperties: countPropertiesByTenant,
    totalPage,
    pageInUse,
    offset,
    reservation,
    arrival,
    departure,
    totalReview: totalReview || 0,
    cancellation,
  }
}

export const getPropertiesByUserService = async ({
  id,
  role,
}: Pick<IUser, 'id' | 'role'>) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }
  const transactionGroupByPropertyAndUser = await prisma.transaction.groupBy({
    where: {
      userId: id,
    },
    by: ['propertyId'],
  })
  const propertyByRecentBooks = await prisma.property.findMany({
    where: {
      id: {
        in: transactionGroupByPropertyAndUser.map((item) => item?.propertyId),
      },
    },
    include: {
      city: true,
      country: true,
      propertyRoomType: {
        orderBy: {
          price: 'asc',
        },
      },
      propertyDetail: {
        include: {
          propertyImage: true,
        },
      },
      propertyType: true,
      review: true,
    },
    take: 10,
  })


  const propertyIdByHistoryView = await prisma.historyView.findMany({
    where: {
      userId: id,
    },
    include: {
      property: {
        include: {
          city: true,
          country: true,
          propertyRoomType: {
            orderBy: {
              price: 'asc',
            },
          },
          propertyDetail: {
            include: {
              propertyImage: true,
            },
          },
          propertyType: true,
          review: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })

  const propertyByHistoryView = propertyIdByHistoryView.map((item) => {
    return item.property
  })


  console.log('>>>>>>>>>>>>>>', transactionGroupByPropertyAndUser)
  return {
    propertyByRecentBooks,
    propertyByHistoryView,
  }
}

export const updatePropertyGeneralInfoService = async ({
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
}: Pick<
  IProperty,
  | 'cityId'
  | 'countryId'
  | 'name'
  | 'star'
  | 'slug'
  | 'address'
  | 'location'
  | 'checkInStartTime'
  | 'checkInEndTime'
  | 'checkOutStartTime'
  | 'zipCode'
  | 'checkOutEndTime'
> &
  Pick<IPropertyDetail, 'phoneNumber' | 'url'> &
  Pick<IUser, 'role' | 'id'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let newSlug
  if (isPropertyExist?.name !== name) {
    newSlug = `${name.toLowerCase().split(' ').join('-')}-${isPropertyExist?.id}`
  }

  const updatedProperty = await prisma.property.update({
    where: {
      id: isPropertyExist?.id,
    },
    data: {
      name,
      address: address as string,
      zipCode: zipCode as string,
      location: location as string,
      cityId,
      countryId,
      checkInStartTime: addHours(
        new Date(
          new Date().toISOString().split('T')[0] +
            'T' +
            checkInStartTime +
            ':00',
        ),
        7,
      ),
      checkInEndTime: checkInEndTime
        ? addHours(
            new Date(
              new Date().toISOString().split('T')[0] +
                'T' +
                checkInEndTime +
                ':00',
            ),
            7,
          )
        : null,
      checkOutStartTime: checkOutStartTime
        ? addHours(
            new Date(
              new Date().toISOString().split('T')[0] +
                'T' +
                checkOutStartTime +
                ':00',
            ),
            7,
          )
        : null,
      checkOutEndTime: addHours(
        new Date(
          new Date().toISOString().split('T')[0] +
            'T' +
            checkOutEndTime +
            ':00',
        ),
        7,
      ),
      star,
      slug: newSlug || slug,
    },
  })

  if (!updatedProperty)
    throw { msg: 'Update property general info failed!', status: 500 }

  const updatedPropertyDetail = await prisma.propertyDetail.update({
    where: {
      propertyId: isPropertyExist?.id,
    },
    data: {
      phoneNumber,
      url,
    },
  })

  if (!updatedPropertyDetail)
    throw { msg: 'Update property general info failed!', status: 500 }

  return {
    updatedProperty,
    updatedPropertyDetail,
  }
}

export const deletePropertyService = async ({
  id,
  role,
  password,
  slug,
}: Pick<IProperty, 'slug'> & Pick<IUser, 'id' | 'role' | 'password'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  const comparingPassword = await comparePassword(
    password as string,
    isTenantExist?.password as string,
  )
  if (!comparingPassword) throw { msg: 'Password invalid!', status: 406 }
  if (isTenantExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
      propertyRoomType: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const getPropertyImages = await prisma.propertyImage.findMany({
    where: {
      propertyDetailId: isPropertyExist?.propertyDetail?.id,
    },
  })

  const propertyImagesToDelete = getPropertyImages.map((item) => {
    return {
      destination: item?.directory,
      filename: `${item?.filename}.${item?.fileExtension}`,
    }
  })

  const getPropertyRoomImages = await prisma.propertyRoomImage.findMany({
    where: {
      propertyRoomTypeId: {
        in: isPropertyExist?.propertyRoomType?.map((item) => item?.id),
      },
    },
  })

  const propertyRoomImagesToDelete = getPropertyRoomImages.map((item) => {
    return {
      destination: item?.directory,
      filename: `${item?.filename}.${item?.fileExtension}`,
    }
  })

  await prisma.$transaction(
    async (tx) => {
      try {
        const deletedPropertyHasFacilities =
          await tx.propertyHasFacility.deleteMany({
            where: {
              propertyId: isPropertyExist?.id,
            },
          })

        const deletedRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
          where: {
            propertyRoomTypeId: {
              in: isPropertyExist?.propertyRoomType?.map((item) => item?.id),
            },
          },
        })

        const deletedSeason = await tx.season.deleteMany({
          where: {
            propertyId: isPropertyExist?.id,
          },
        })

        const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
          where: {
            propertyId: isPropertyExist?.id,
          },
        })

        const deletedPropertyImages = await tx.propertyImage.deleteMany({
          where: {
            propertyDetailId: isPropertyExist?.propertyDetail?.id,
          },
        })

        const deletedPropertyRoomImages = await tx.propertyRoomImage.deleteMany(
          {
            where: {
              propertyRoomTypeId: {
                in: isPropertyExist?.propertyRoomType?.map((item) => item?.id),
              },
            },
          },
        )

        const deletedPropertyDetail = await tx.propertyDetail.delete({
          where: {
            propertyId: isPropertyExist?.id,
          },
        })

        const softDeletePropertyRoomType = await tx.propertyRoomType.updateMany(
          {
            where: {
              propertyId: isPropertyExist?.id,
            },
            data: {
              deletedAt: new Date().toISOString(),
            },
          },
        )

        const softDeleteProperty = await tx.property.update({
          where: {
            id: isPropertyExist?.id,
          },
          data: {
            deletedAt: new Date().toISOString(),
          },
        })

        deleteFiles({
          imagesUploaded: {
            images: [...propertyImagesToDelete, ...propertyRoomImagesToDelete],
          },
        })
      } catch (err) {
        throw { msg: 'Delete property failed!', status: 500 }
      }
    },
    {
      timeout: 20000,
    },
  )
}
