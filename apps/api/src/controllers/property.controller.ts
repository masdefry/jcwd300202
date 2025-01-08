import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidV4 } from 'uuid'
import { getRoomTypeService } from '@/services/property.service'
import { deleteFiles } from '@/utils/deleteFiles'
import { addDays, addHours, differenceInDays, format } from 'date-fns'

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      cityName,
      countryName,
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
            name,
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
            location,
            zipCode,
            address,
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
            propertyDescription,
            neighborhoodDescription,
            phoneNumber,
            url,
            totalRooms: Number(totalRooms),
          },
        })

        const copiedImagesUploaded = [...imagesUploaded]
        const imagesForProperty: any = []
        for (let i = 0; i < countPropertyImages; i++) {
          imagesForProperty.push({
            propertyDetailId: createdPropertyDetail?.id,
            filename: copiedImagesUploaded[i]?.filename.split('.')[0],
            fileExtension: copiedImagesUploaded[i]?.filename.split('.')[1],
            directory: copiedImagesUploaded[i]?.destination,
          })
          copiedImagesUploaded.shift()
        }

        createdPropertyRoomTypes =
          await tx.propertyRoomType.createManyAndReturn({
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

    res.status(201).json({
      error: false,
      message: 'Create property success',
      data: {
        createdProperty,
        createdRoomHasFacilities,
        createdPropertyDetail,
        createdPropertyRoomTypes,
        createdPropertyHasFacilities,
      },
    })
  } catch (error) {
    if (!Array.isArray(req.files)) {
      deleteFiles({ imagesUploaded: req.files })
    }
    next(error)
  }

  //jika punya facility children maka boleh tambah children
}

export const getPropertyDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const { checkInDate, checkOutDate, adult, children } = req.query

    const property = await prisma.property.findFirst({
      where: {
        slug: slug as string,
      },
      include: {
        propertyDetail: true,
        propertyRoomType: true,
      },
    })

    if (!property?.id) throw { msg: 'Property not found!', status: 406 }

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
      },
    })

    const propertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        propertyId: property?.id,
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
    })

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

    res.status(200).json({
      error: false,
      message: 'Get property detail success',
      data: {
        property,
        propertyDetail: property.propertyDetail,
        propertyFacilities,
        propertyImages: [...propertyImages, ...propertyRoomImages],
        propertyImagesPreview: [...propertyImages, ...propertyRoomImages].slice(
          0,
          8,
        ),
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

    const propertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        propertyId,
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

    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
        propertyRoomType,
        isIncludeBreakfast,
        totalPage,
        pageInUse,
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
    const propertyType = await prisma.propertyType.findMany({
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

    res.status(200).json({
      error: false,
      message: 'Get data for filtering property success',
      data: {
        propertyType,
        propertyFacility,
        propertyRoomFacility,
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
    } = req.headers

    let numberedPropertyFacilityIdArr,
      numberedPropertyRoomFacilityIdArr,
      numberedPropertyTypeIdArr
    let propertyFacilityFromPrisma, propertyRoomFacilityFromPrisma
    let city, country
    if (!sortBy) throw { msg: 'Sort parameter not found!', status: 406 }
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
    if (propertytypeidarr) {
      const propertyTypeIdStr = propertytypeidarr as string
      numberedPropertyTypeIdArr = propertyTypeIdStr.split(',')
      numberedPropertyTypeIdArr = numberedPropertyTypeIdArr.map((item) =>
        Number(item),
      )
    }

    // cityId && (
    //     city = await prisma.city.findUnique({
    //         where: {
    //             id: Number(cityId)
    //         }
    //     })
    // )

    // countryId && (
    //     country = await prisma.country.findUnique({
    //         where: {
    //             id: Number(countryId)
    //         }
    //     })
    // )

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
    ]
      .filter(Boolean)
      .filter((item) => item?.countryId !== null)
      .filter((item) => item?.cityId !== null)

    console.log(Number(countryId))

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
        // where: {
        //     AND: [...whereConditionGeneral, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility].filter(Boolean),
        //     OR: [
        //         cityId: Number(cityId)
        //     ]
        // },
        where: whereCondition,
        include: {
          propertyRoomType: true,
        },
      })
      if (sortBy === 'name') {
        sortedProperties = await prisma.property.findMany({
          where: {
            id: {
              in: propertiesWithoutLimit.map((item) => item?.id),
            },
          },
          select: {
            id: true,
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
        },
        include: {
          propertyRoomType: {
            orderBy: {
              price: 'asc',
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
          propertyRoomType: true,
        },
      })
      if (sortBy === 'name') {
        sortedProperties = await prisma.property.findMany({
          select: {
            id: true,
          },
          orderBy: {
            name: order === 'desc' ? 'desc' : 'asc',
          },
          take: Number(limit),
          skip: Number(offset),
        })
        sortedPropertiesId = sortedProperties?.map((item) => item.id)
      } else {
        sortedProperties = await prisma.propertyRoomType.groupBy({
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
        },
        country,
        city,
        countryId,
        cityId,
      },
    })
  } catch (error: any) {
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

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const getProperty = await prisma.property.findFirst({
      where: {
        slug,
      },
      include: {
        propertyDetail: true,
        propertyType: true,
        city: true,
        country: true
      },
    })
    if (!getProperty?.id) throw { msg: 'Property not found!', status: 406 }

    const getPropertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        propertyId: getProperty?.id,
      },
    })

    if (getPropertyRoomType.length <= 0)
      throw { msg: 'Property room type not found!', status: 406 }

    res.status(200).json({
      error: false,
      message: 'Get property description success',
      data: {
        property: getProperty,
        propertyRoomType: getPropertyRoomType,
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

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
      },
      include: {
        propertyDetail: true,
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id) throw { msg: 'Actions not permitted!', status: 406 }

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

    res.status(200).json({
      error: false,
      message: 'Update property descriptions success',
      data: {
        propertyDescription,
        neighborhoodDescription,
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
    const { limit = 5, offset = 0, sortBy, order } = req.query

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const getProperties = await prisma.property.findMany({
      where: {
        tenantId: isTenantExist?.id,
      },
      orderBy: {
        name: 'asc',
      },
      take: Number(limit),
      skip: Number(offset),
    })

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
        ],
      },
      include: {
        transaction: true,
      },
    })

    const countPropertiesByTenant = await prisma.property.count({
      where: {
        tenantId: id,
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

    const addedDataGetProperties = getProperties.map((item, index) => {
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
      let avgRating
      if (reviewsByProperty.length > 0) {
        avgRating = reviewsByProperty.reduce(
          (acc: any, curr: any) => acc + curr,
        )
      }
      return {
        ...item,
        totalBooked,
        totalCancelled,
        avgRating: avgRating || 0,
      }
    })
    const totalPage = Math.ceil(countPropertiesByTenant / Number(limit))
    const pageInUse = Number(offset) / Number(limit) + 1

    res.status(200).json({
      error: false,
      message: 'Get properties by tenant success',
      data: {
        properties: addedDataGetProperties,
        countProperties: countPropertiesByTenant,
        totalPage,
        pageInUse,
        offset,
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

    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const propertyIdByRecentBooks = await prisma.transaction.findMany({
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

    const propertyByRecentBooks = propertyIdByRecentBooks.map((item) => {
      return item.property
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

    res.status(200).json({
      error: false,
      message: 'Get properties by user success',
      data: {
        propertyByRecentBooks,
        propertyByHistoryView,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updatePropertyGeneralInfo = async(req: Request, res: Response,next: NextFunction) => {
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
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
      },
      include: {
        propertyDetail: true,
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id) throw { msg: 'Actions not permitted!', status: 406 }

    let newSlug;
    if(isPropertyExist?.name !== name) {
      newSlug = `${name.toLowerCase().split(' ').join('-')}-${isPropertyExist?.id}`
    }

    const updatedProperty = await prisma.property.update({
      where: {
        id: isPropertyExist?.id
      },
      data: {
        name,
        address,
        zipCode,
        location,
        cityId,
        countryId,
        checkInStartTime: addHours(
          new Date(
            new Date().toISOString().split('T')[0] +
              'T' +
              checkInStartTime +
              ':00',
          ), 7
        ) 
        ,
        checkInEndTime: checkInEndTime
          ? addHours(
          new Date(
              new Date().toISOString().split('T')[0] +
                'T' +
                checkInEndTime +
                ':00',
              ), 7
            ) 
          : null,
        checkOutStartTime: checkOutStartTime
          ?  addHours(
          new Date(
              new Date().toISOString().split('T')[0] +
                'T' +
                checkOutStartTime +
                ':00',
              ), 7
            ) 
          : null,
        checkOutEndTime:addHours(
         new Date(
          new Date().toISOString().split('T')[0] +
            'T' +
            checkOutEndTime +
            ':00',
          ), 7
        ), 
        star, 
        slug: newSlug || slug
      }
    })

    if(!updatedProperty) throw { msg: 'Update property general info failed!', status: 500 }
    
    const updatedPropertyDetail = await prisma.propertyDetail.update({
      where: {
        propertyId: isPropertyExist?.id
      },
      data: {
        phoneNumber,
        url,
      }
    })

    if(!updatedPropertyDetail) throw { msg: 'Update property general info failed!', status: 500 }

    res.status(200).json({
      error: false,
      message: 'Update property general info success',
      data: {
        updatedProperty,
        updatedPropertyDetail
      }
    })
  } catch (error) {
    next(error)
  }
}

