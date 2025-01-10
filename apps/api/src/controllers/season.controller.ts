import prisma from '@/prisma'
import { Response, Request, NextFunction } from 'express'
import { addDays, addMonths, differenceInDays } from 'date-fns'
import { error } from 'console'

export const createSeasonalPriceAndAvailabilty = async (
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

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }
    if (!isTenantExist?.isVerified)
      throw { msg: 'Tenant not verified!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        propertyRoomType: {
          some: {
            id: Number(propertyRoomTypeId),
          },
        },
      },
      select: {
        id: true,
        tenantId: true,
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Room type not found!', status: 406 }
    if (roomsToSell > isPropertyRoomTypeExist?.totalRooms)
      throw {
        msg: 'The number of rooms exceeds the total rooms limit! Change capacity first.',
        status: 406,
      }

    const isDateUsed = await prisma.seasonalPrice.findMany({
      where: {
        date: {
          lte: startDate,
          gte: endDate,
        },
      },
    })

    if (isDateUsed.length > 0) throw { msg: 'Date has been used!', status: 406 }

    let createdSeason: any, createdSeasonalPrice
    await prisma.$transaction(async (tx) => {
      createdSeason = await tx.season.create({
        data: {
          propertyRoomTypeId,
          propertyId: isPropertyExist?.id,
          name,
          startDate: new Date(startDate.split('T')[0]).toISOString(),
          endDate: new Date(endDate.split('T')[0]).toISOString(),
        },
      })

      if (!createdSeason?.id)
        throw { msg: 'Create season failed!', status: 500 }

      const dataToCreateSeasonalPrices = Array.from({
        length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
      }).map((_, index) => {
        return {
          price:  roomPrices,
          propertyId: isPropertyExist?.id,
          seasonId: createdSeason?.id as number,
          propertyRoomTypeId,
          roomAvailability: availability,
          isPeak,
          isStartSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(startDate.split('T')[0]).toISOString()),
          isEndSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(endDate.split('T')[0]).toISOString()),
          roomToRent: availability ? roomsToSell : 0,
          date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
        }
      })

      createdSeasonalPrice = await tx.seasonalPrice.createMany({
        data: dataToCreateSeasonalPrices,
      })
    })

    res.status(201).json({
      error: false,
      message: 'Create seasonal price success',
      data: {
        createdSeason,
        createdSeasonalPrice,
      },
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getBulkSeasonalPriceAndAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyRoomTypeId, startDate, endDate } = req.query

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Room type not found!', status: 406 }

    const season = await prisma.season.findFirst({
      where: {
        propertyRoomTypeId: Number(propertyRoomTypeId),
        startDate: {
          gte: new Date(startDate as string).toISOString(),
        },
        endDate: {
          lte: new Date(startDate as string).toISOString(),
        },
        // startDate: new Date(startDate as string).toISOString(),
        // endDate: new Date(endDate as string).toISOString(),
      },
    })

    res.status(200).json({
      error: false,
      message: 'Get seasonal price success',
      data: {},
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

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Room type not found!', status: 406 }
    if (!date) throw { msg: 'Date not found!', status: 406 }

    let dateForSearch = date as string
    const seasonalPrice = await prisma.seasonalPrice.findFirst({
      where: {
        propertyRoomTypeId: Number(propertyRoomTypeId),
        date: new Date(dateForSearch).toISOString(),
      },
      include: {
        season: true,
      },
    })

    // console.log('seasonalPrice:', seasonalPrice)
    // console.log('season:', season?.id)
    const season = seasonalPrice?.season

    res.status(200).json({
      error: false,
      message: 'Get seasonal price success',
      data: {
        season: {
          ...season,
          propertyRoomTypeId: isPropertyRoomTypeExist?.id,
        },
        seasonalPrice: {
          ...seasonalPrice,
          basePrice: isPropertyRoomTypeExist?.price,
          totalRooms: isPropertyRoomTypeExist?.totalRooms,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateSeason = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      seasonId,
      roomPrices,
      roomsToSell,
      availability,
      propertyRoomTypeId,
      name,
      startDate,
      endDate,
      isPeak,
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
    if (!isTenantExist?.isVerified)
      throw { msg: 'Tenant not verified!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        propertyRoomType: {
          some: {
            id: Number(propertyRoomTypeId),
          },
        },
      },
      select: {
        id: true,
        tenantId: true,
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Room type not found!', status: 406 }
    if (roomsToSell > isPropertyRoomTypeExist?.totalRooms)
      throw {
        msg: 'The number of rooms exceeds the total rooms limit! Edit total room first.',
        status: 406,
      }
    console.log(seasonId)
    const isSeasonExist = await prisma.season.findUnique({
      where: {
        id: Number(seasonId),
      },
    })

    let createdSeason: any, createdSeasonalPrice
    await prisma.$transaction(async (tx) => {
      const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
        where: {
          seasonId: isSeasonExist?.id,
        },
      })

      const deletedSeason = await tx.season.delete({
        where: {
          id: isSeasonExist?.id,
        },
      })

      createdSeason = await tx.season.create({
        data: {
          propertyRoomTypeId,
          propertyId: isPropertyExist?.id,
          name,
          startDate: new Date(startDate.split('T')[0]).toISOString(),
          endDate: new Date(endDate.split('T')[0]).toISOString(),
        },
      })

      if (!createdSeason?.id)
        throw { msg: 'Create season failed!', status: 500 }

      const dataToCreateSeasonalPrices = Array.from({
        length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
      }).map((_, index) => {
        return {
          price: roomPrices,
          propertyId: isPropertyExist?.id,
          seasonId: createdSeason?.id as number,
          roomAvailability: availability,
          propertyRoomTypeId,
          isPeak,
          isStartSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(startDate.split('T')[0]).toISOString()),
          isEndSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(endDate.split('T')[0]).toISOString()),
          roomToRent: availability ? roomsToSell : 0,
          date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
        }
      })

      createdSeasonalPrice = await tx.seasonalPrice.createMany({
        data: dataToCreateSeasonalPrices,
      })
    })

    // let updatedSeason : any, updatedSeasonalPrice
    // await prisma.$transaction(async(tx) => {
    //     updatedSeason = await tx.season.update({
    //         where: {
    //             id: isSeasonExist?.id
    //         },
    //         data: {
    //             name,
    //             startDate: new Date(startDate.split('T')[0]).toISOString(),
    //             endDate: new Date(endDate.split('T')[0]).toISOString(),
    //         }
    //     })

    //     if(!updatedSeason?.id) throw { msg: 'update season failed!', status: 500 }

    //     const dataToupdateSeasonalPrices = Array.from({ length: differenceInDays(new Date(endDate), new Date(startDate)) + 1}).map((_, index) => {
    //         return {
    //             price: roomPrices,
    //             propertyId: isPropertyExist?.id,
    //             seasonId: updatedSeason?.id as number,
    //             propertyRoomTypeId,
    //             isPeak,
    //             isStartSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(startDate.split('T')[0]).toISOString()),
    //             isEndSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(endDate.split('T')[0]).toISOString()),
    //             roomToRent: availability ? roomsToSell : 0,
    //             date: new Date((addDays(startDate.split('T')[0], index))).toISOString()

    //         }
    //     })

    //     updatedSeasonalPrice = await tx.seasonalPrice.updateMany({
    //         data: dataToUpdateSeasonalPrices
    //     })

    // })
    res.status(200).json({
      error: false,
      message: 'Update seasonal price success',
      data: {
        updatedSeason: createdSeason,
        updatedSeasonalPrice: createdSeasonalPrice,
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
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })
    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }
    if (!isTenantExist?.isVerified)
      throw { msg: 'Tenant not verified!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
      },
      include: {
        propertyRoomType: {
          include: {
            season: true
          },
          orderBy: {
            price: 'asc'
          }
        },
        
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const startDate = new Date(Number(year), Number(month), 0)
    const endDate = addMonths(new Date(Number(year), Number(month), 0), 1)

    const getSeasons = await prisma.seasonalPrice.findMany({
      where: {
        property: {
          slug,
        },
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        season: true,
      },
    })

    let filterredSeasonByPropertySeason = isPropertyExist?.propertyRoomType[0]?.season.filter((item) => {
      let isPropertySeasonExist = true
      isPropertyExist?.propertyRoomType?.filter(room => {
        const findIndexSameSeason = room?.season?.findIndex(season => {
          return (season.name === item.name) && (season.startDate.toString() == item.startDate.toString()) && (season.endDate.toString() == item.endDate.toString())  
        })
      })
      return isPropertySeasonExist
    })

    const findPropertySeasonalPrice = await prisma.season.findMany({
      where: {
        id: {
          in: filterredSeasonByPropertySeason.map(item => item?.id)
        }
      },
      include: {
        seasonalPrice: true
      }
    })
    res.status(200).json({
      error: false,
      message: 'Get seasons by property success',
      data: {
        property: isPropertyExist,
        seasons: getSeasons,
        propertySeasons: findPropertySeasonalPrice
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createSeasonalAvailabiltyByProperty = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id,
      role,
      availability,
      roomPricePercentage,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

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
    if (!isTenantExist?.isVerified)
      throw { msg: 'Tenant not verified!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug
      },
      include: {
        propertyRoomType: true
      }
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isDateUsed = await prisma.seasonalPrice.findMany({
      where: {
        date: {
          lte: startDate,
          gte: endDate,
        },
      },
    })

    if (isDateUsed.length > 0) throw { msg: 'Date has been used!', status: 406 }

    const dataForCreateManySeason = isPropertyExist?.propertyRoomType.map((item) => {
      return {
        propertyRoomTypeId: item?.id,
        propertyId: isPropertyExist?.id,
        name,
        startDate: new Date(startDate.split('T')[0]).toISOString(),
        endDate: new Date(endDate.split('T')[0]).toISOString(),
      }
    })

    let createdSeasons: any, createdSeasonalPrices
    await prisma.$transaction(async (tx) => {
      createdSeasons = await tx.season.createManyAndReturn({
        data: dataForCreateManySeason
      })

      if (createdSeasons?.length <= 0)
        throw { msg: 'Create season failed!', status: 500 }


      const dataToCreateSeasonalPrices = createdSeasons?.map((item: any, indexCreatedSeason: number) => {
        const price = roomPricePercentage ? (Number(roomPricePercentage) / 100) * isPropertyExist?.propertyRoomType[indexCreatedSeason].price : isPropertyExist?.propertyRoomType[indexCreatedSeason].price
        const totalRooms = isPropertyExist?.propertyRoomType[indexCreatedSeason].totalRooms
        return (
          Array.from({
            length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
          }).map((_, index) => {
            return {
              price,
              propertyId: isPropertyExist?.id,
              seasonId: item?.id as number,
              propertyRoomTypeId: item?.propertyRoomTypeId,
              roomAvailability: availability,
              isPeak,
              isStartSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(startDate.split('T')[0]).toISOString()),
              isEndSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(endDate.split('T')[0]).toISOString()),
              roomToRent: totalRooms,
              date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
            }
          })
        )
      }).flat()

      createdSeasonalPrices = await tx.seasonalPrice.createMany({
        data: dataToCreateSeasonalPrices,
      })
    })

    res.status(201).json({
      error: false,
      message: 'Create seasonal price success',
      data: {
        createdSeasons,
        createdSeasonalPrices,
      },
    })

  } catch (error) {
    next(error)
  }
}

export const updateManySeasonsByPropertySeason = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id,
      role,
      seasonId,
      roomsToSell,
      availability,
      roomPricePercentage,
      propertyRoomTypeId,
      name,
      startDate,
      endDate,
      isPeak,
    } = req.body

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
    if (!isTenantExist?.isVerified)
      throw { msg: 'Tenant not verified!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug
      },
      include: {
        propertyRoomType: {
          include: {
            season: true
          }
        }
      }
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypesExist = await prisma.propertyRoomType.findMany({
      where: {
        id: {
          in: isPropertyExist?.propertyRoomType.map(item => item?.id)
        },
        deletedAt: null
      },
    })

    if (isPropertyRoomTypesExist.length <= 0)
      throw { msg: 'Room type not found!', status: 406 }

    let filterredSeasonByPropertySeason = isPropertyExist?.propertyRoomType[0]?.season.filter((item) => {
      let isPropertySeasonExist = true
      isPropertyExist?.propertyRoomType?.filter(room => {
        const findIndexSameSeason = room?.season?.findIndex(season => {
          return (season.name === item.name) && (season.startDate.toString() == item.startDate.toString()) && (season.endDate.toString() == item.endDate.toString())  
        })
      })
      return isPropertySeasonExist
    })

    const findPropertySeasonalPrice = await prisma.season.findMany({
      where: {
        id: {
          in: filterredSeasonByPropertySeason.map(item => item?.id)
        }
      },
      include: {
        seasonalPrice: true
      }
    })

    let createdSeasons: any, createdSeasonalPrices
    await prisma.$transaction(async (tx) => {
      const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
        where: {
          seasonId: {
            in: findPropertySeasonalPrice.map(item => item.id)
          }
        },
      })

      const deletedSeason = await tx.season.deleteMany({
        where: {
          id: {
            in: findPropertySeasonalPrice.map(item => item.id)
          }
        },
      })

      const dataForCreateManySeason = isPropertyExist?.propertyRoomType.map((item) => {
        return {
          propertyRoomTypeId: item?.id,
          propertyId: isPropertyExist?.id,
          name,
          startDate: new Date(startDate.split('T')[0]).toISOString(),
          endDate: new Date(endDate.split('T')[0]).toISOString(),
        }
      })

      createdSeasons = await tx.season.createManyAndReturn({
        data: dataForCreateManySeason
      })

      if (createdSeasons?.length <= 0)
        throw { msg: 'Create season failed!', status: 500 }


      const dataToCreateSeasonalPrices = createdSeasons?.map((item: any, indexCreatedSeason: number) => {
        const price = roomPricePercentage ? (Number(roomPricePercentage) / 100) * isPropertyExist?.propertyRoomType[indexCreatedSeason].price : isPropertyExist?.propertyRoomType[indexCreatedSeason].price
        const totalRooms = isPropertyExist?.propertyRoomType[indexCreatedSeason].totalRooms
        return (
          Array.from({
            length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
          }).map((_, index) => {
            return {
              price,
              propertyId: isPropertyExist?.id,
              seasonId: item?.id as number,
              propertyRoomTypeId: item?.propertyRoomTypeId,
              roomAvailability: availability,
              isPeak,
              isStartSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(startDate.split('T')[0]).toISOString()),
              isEndSeason: Boolean(new Date(addDays(startDate.split('T')[0], index)).toISOString() ===  new Date(endDate.split('T')[0]).toISOString()),
              roomToRent: totalRooms,
              date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
            }
          })
        )
      }).flat()

      createdSeasonalPrices = await tx.seasonalPrice.createMany({
        data: dataToCreateSeasonalPrices,
      })
    })
    
    res.status(200).json({
      error: false,
      message: 'Update seasonal price success',
      data: {
        updatedSeasons: createdSeasons,
        updatedSeasonalPrices: createdSeasonalPrices,
      },
    })
  } catch (error) {
    next(error)
  }
}