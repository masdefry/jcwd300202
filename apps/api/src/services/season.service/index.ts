import prisma from '@/prisma'
import { Response, Request, NextFunction } from 'express'
import { addDays, addMonths, addYears, differenceInDays } from 'date-fns'
import { error } from 'console'
import { IUser } from '../auth.service/types'
import { ISeason, ISeasonalPrice } from './types'
import { IProperty } from '../property.service/types'

export const createSeasonalPriceService = async ({
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
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeasonalPrice, 'isPeak' | 'propertyRoomTypeId'> &
  Pick<ISeason, 'name' | 'availability'> & {
    startDate: string
    endDate: string
    roomPrices: number | string
    roomsToSell: number | string
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room type not found!', status: 406 }
  if (Number(roomsToSell) > isPropertyRoomTypeExist?.totalRooms)
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

    if (!createdSeason?.id) throw { msg: 'Create season failed!', status: 500 }

    const dataToCreateSeasonalPrices = Array.from({
      length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
    }).map((_, index) => {
      return {
        price: Number(roomPrices),
        propertyId: isPropertyExist?.id,
        seasonId: createdSeason?.id as number,
        propertyRoomTypeId,
        roomAvailability: availability,
        isPeak,
        isStartSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(startDate.split('T')[0]).toISOString(),
        ),
        isEndSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(endDate.split('T')[0]).toISOString(),
        ),
        roomToRent: availability ? Number(roomsToSell) : 0,
        date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
      }
    })

    createdSeasonalPrice = await tx.seasonalPrice.createMany({
      data: dataToCreateSeasonalPrices,
    })
  })

  return {
    createdSeason,
    createdSeasonalPrice,
  }
}

export const getBulkSeasonalPriceAndAvailabilityService = async ({
  id,
  role,
  startDate,
  endDate,
  propertyRoomTypeId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeasonalPrice, 'propertyRoomTypeId'> & {
    startDate: string
    endDate: string
  }) => {
  if (!startDate && !endDate) throw { msg: 'Date is missing', status: 406 }

  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room type not found!', status: 406 }

  const season = await prisma.season.findFirst({
    where: {
      propertyRoomTypeId: Number(propertyRoomTypeId),
      startDate: {
        gte: new Date((startDate as string).split('T')[0]).toISOString(),
      },
      endDate: {
        lte: new Date((endDate as string).split('T')[0]).toISOString(),
      },
    },
  })

  if (!season?.id) throw { msg: 'Season not found!', status: 406 }

  return {
    season: {
      ...season,
      propertyRoomTypeId: isPropertyRoomTypeExist?.id,
    },
    seasonalPrice: {
      propertyRoomTypeId: isPropertyRoomTypeExist?.id,
      basePrice: isPropertyRoomTypeExist?.price,
      totalRooms: isPropertyRoomTypeExist?.totalRooms,
    },
  }
}

export const getSingleSeasonalPriceAndAvailabilityService = async ({
  propertyRoomTypeId,
  date,
}: Pick<ISeasonalPrice, 'propertyRoomTypeId'> & { date: string }) => {
  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
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

  const season = seasonalPrice?.season

  return {
    season: {
      ...season,
      propertyRoomTypeId: isPropertyRoomTypeExist?.id,
    },
    seasonalPrice: {
      ...seasonalPrice,
      basePrice: isPropertyRoomTypeExist?.price,
      totalRooms: isPropertyRoomTypeExist?.totalRooms,
    },
  }
}

export const updateSeasonalPriceService = async ({
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
  propertyRoomTypeId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeasonalPrice, 'isPeak' | 'propertyRoomTypeId'> &
  Pick<ISeason, 'name' | 'availability'> & {
    startDate: string
    endDate: string
    roomPrices: number | string
    roomsToSell: number | string
  } & Pick<ISeasonalPrice, 'seasonId'> & {
    seasonalPriceId: number | string
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room type not found!', status: 406 }
  if (Number(roomsToSell) > isPropertyRoomTypeExist?.totalRooms)
    throw {
      msg: 'The number of rooms exceeds the total rooms limit! Edit total room first.',
      status: 406,
    }

  const isSeasonExist = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
  })

  const isSeasonalPriceExist = await prisma.seasonalPrice.findUnique({
    where: {
      id: Number(seasonalPriceId),
    },
  })

  let isSeasonWillUpdate = false
  if (
    isSeasonalPriceExist?.date === isSeasonExist?.startDate &&
    isSeasonalPriceExist?.date === isSeasonExist?.endDate
  ) {
    isSeasonWillUpdate = true
  }

  let createdSeason: any, createdSeasonalPrice
  await prisma.$transaction(async (tx) => {
    const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
      where: {
        id: Number(seasonalPriceId),
      },
    })

    if (isSeasonWillUpdate) {
      const deletedSeason = await tx.season.delete({
        where: {
          id: isSeasonExist?.id,
        },
      })

      createdSeason = await tx.season.create({
        data: {
          propertyRoomTypeId: Number(propertyRoomTypeId),
          propertyId: isPropertyExist?.id,
          name,
          startDate: new Date(startDate.split('T')[0]).toISOString(),
          endDate: new Date(endDate.split('T')[0]).toISOString(),
        },
      })

      if (!createdSeason?.id)
        throw { msg: 'Recreate season failed!', status: 500 }
    }

    const dataToCreateSeasonalPrices = Array.from({
      length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
    }).map((_, index) => {
      return {
        price: Number(roomPrices),
        propertyId: isPropertyExist?.id,
        seasonId:
          (createdSeason?.id as number) || (isSeasonExist?.id as number),
        roomAvailability: availability,
        propertyRoomTypeId: Number(propertyRoomTypeId),
        isPeak,
        isStartSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(startDate.split('T')[0]).toISOString(),
        ),
        isEndSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(endDate.split('T')[0]).toISOString(),
        ),
        roomToRent: availability ? Number(roomsToSell) : 0,
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
  return {
    updatedSeason: createdSeason,
    updatedSeasonalPrice: createdSeasonalPrice,
  }
}

export const getSeasonsByPropertyService = async ({
  id,
  role,
  month,
  slug,
  year,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & {
    month: string | number
    year: string | number
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
        orderBy: {
          price: 'asc',
        },
      },
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const startDate = new Date(Number(year), Number(month), 0)
  const endDate = addYears(new Date(Number(year), Number(month), 0), 1)

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

  let filterredSeasonByPropertySeason =
    isPropertyExist?.propertyRoomType[0]?.season.filter((item) => {
      let isPropertySeasonExist = true
      isPropertyExist?.propertyRoomType?.forEach((room) => {
        const findIndexSameSeason = room?.season?.findIndex((season) => {
          return (
            season.name === item.name &&
            season.startDate.toString() == item.startDate.toString() &&
            season.endDate.toString() == item.endDate.toString()
          )
        })
        if (findIndexSameSeason <= -1) isPropertySeasonExist = false
      })
      return isPropertySeasonExist
    })

  const findPropertySeasonalPrice = await prisma.season.findMany({
    where: {
      id: {
        in: filterredSeasonByPropertySeason.map((item) => item?.id),
      },
    },
    include: {
      seasonalPrice: true,
    },
  })
  return {
    property: isPropertyExist,
    seasons: getSeasons,
    propertySeasons: findPropertySeasonalPrice,
  }
}

export const createSeasonalAvailabiltyByPropertyService = async ({
  id,
  role,
  availability,
  pricePercentage,
  name,
  startDate,
  endDate,
  isPeak,
  slug,
}: Pick<ISeason, 'availability' | 'name' | 'isPeak'> &
  Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & {
    pricePercentage: string | number
    startDate: string
    endDate: string
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isDateUsed = await prisma.seasonalPrice.findMany({
    where: {
      date: {
        lte: startDate,
        gte: endDate,
      },
    },
  })

  if (isDateUsed.length > 0) throw { msg: 'Date has been used!', status: 406 }

  const dataForCreateManySeason = isPropertyExist?.propertyRoomType.map(
    (item) => {
      return {
        ratesPercentage: Number(pricePercentage),
        availability,
        isPeak,
        propertyRoomTypeId: item?.id,
        propertyId: isPropertyExist?.id,
        name,
        startDate: new Date(startDate.split('T')[0]).toISOString(),
        endDate: new Date(endDate.split('T')[0]).toISOString(),
      }
    },
  )

  let createdSeasons: any, createdSeasonalPrices
  await prisma.$transaction(async (tx) => {
    createdSeasons = await tx.season.createManyAndReturn({
      data: dataForCreateManySeason,
    })

    if (createdSeasons?.length <= 0)
      throw { msg: 'Create season failed!', status: 500 }

    const dataToCreateSeasonalPrices = createdSeasons
      ?.map((item: any, indexCreatedSeason: number) => {
        const price = pricePercentage
          ? (Number(pricePercentage) / 100) *
            isPropertyExist?.propertyRoomType[indexCreatedSeason].price
          : isPropertyExist?.propertyRoomType[indexCreatedSeason].price
        const totalRooms =
          isPropertyExist?.propertyRoomType[indexCreatedSeason].totalRooms
        return Array.from({
          length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
        }).map((_, index) => {
          return {
            price,
            propertyId: isPropertyExist?.id,
            seasonId: item?.id as number,
            propertyRoomTypeId: item?.propertyRoomTypeId,
            roomAvailability: availability,
            isPeak,
            isStartSeason: Boolean(
              new Date(
                addDays(startDate.split('T')[0], index),
              ).toISOString() ===
                new Date(startDate.split('T')[0]).toISOString(),
            ),
            isEndSeason: Boolean(
              new Date(
                addDays(startDate.split('T')[0], index),
              ).toISOString() === new Date(endDate.split('T')[0]).toISOString(),
            ),
            roomToRent: totalRooms,
            date: new Date(
              addDays(startDate.split('T')[0], index),
            ).toISOString(),
          }
        })
      })
      .flat()

    createdSeasonalPrices = await tx.seasonalPrice.createMany({
      data: dataToCreateSeasonalPrices,
    })
  })
  return {
    createdSeasons,
    createdSeasonalPrices,
  }
}

export const updateManySeasonsByPropertySeasonService = async ({
  id,
  role,
  seasonId,
  availability,
  pricePercentage,
  name,
  startDate,
  endDate,
  isPeak,
  slug,
}: Pick<IProperty, 'slug'> &
  Pick<ISeasonalPrice, 'isPeak' | 'seasonId'> &
  Pick<ISeason, 'name' | 'availability'> &
  Pick<IUser, 'id' | 'role'> & {
    startDate: string
    endDate: string
    pricePercentage: string | number
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
      },
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypesExist = await prisma.propertyRoomType.findMany({
    where: {
      id: {
        in: isPropertyExist?.propertyRoomType.map((item) => item?.id),
      },
      deletedAt: null,
    },
  })

  if (isPropertyRoomTypesExist.length <= 0)
    throw { msg: 'Room type not found!', status: 406 }

  const isSeasonExist = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
  })

  if (!isSeasonExist?.id) throw { msg: 'Season not found!', status: 406 }

  const getSeasons = await prisma.season.findMany({
    where: {
      name: isSeasonExist?.name,
      endDate: isSeasonExist?.endDate,
      startDate: isSeasonExist?.startDate,
      ratesPercentage: isSeasonExist?.ratesPercentage,
    },
  })

  let createdSeasons: any, createdSeasonalPrices
  await prisma.$transaction(async (tx) => {
    const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
      where: {
        seasonId: {
          in: getSeasons.map((item) => item.id),
        },
      },
    })

    const deletedSeason = await tx.season.deleteMany({
      where: {
        id: {
          in: getSeasons.map((item) => item.id),
        },
      },
    })

    const dataForCreateManySeason = isPropertyExist?.propertyRoomType.map(
      (item) => {
        return {
          propertyRoomTypeId: item?.id,
          propertyId: isPropertyExist?.id,
          name,
          isPeak,
          availability,
          ratesPercentage: Number(pricePercentage),
          startDate: new Date(startDate.split('T')[0]).toISOString(),
          endDate: new Date(endDate.split('T')[0]).toISOString(),
        }
      },
    )

    createdSeasons = await tx.season.createManyAndReturn({
      data: dataForCreateManySeason,
    })

    if (createdSeasons?.length <= 0)
      throw { msg: 'Update season failed!', status: 500 }

    const dataToCreateSeasonalPrices = createdSeasons
      ?.map((item: any, indexCreatedSeason: number) => {
        const price = pricePercentage
          ? (Number(pricePercentage) / 100) *
            isPropertyExist?.propertyRoomType[indexCreatedSeason].price
          : isPropertyExist?.propertyRoomType[indexCreatedSeason].price
        const totalRooms =
          isPropertyExist?.propertyRoomType[indexCreatedSeason].totalRooms
        return Array.from({
          length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
        }).map((_, index) => {
          return {
            price,
            propertyId: isPropertyExist?.id,
            seasonId: item?.id as number,
            propertyRoomTypeId: item?.propertyRoomTypeId,
            roomAvailability: availability,
            isPeak,
            isStartSeason: Boolean(
              new Date(
                addDays(startDate.split('T')[0], index),
              ).toISOString() ===
                new Date(startDate.split('T')[0]).toISOString(),
            ),
            isEndSeason: Boolean(
              new Date(
                addDays(startDate.split('T')[0], index),
              ).toISOString() === new Date(endDate.split('T')[0]).toISOString(),
            ),
            roomToRent: totalRooms,
            date: new Date(
              addDays(startDate.split('T')[0], index),
            ).toISOString(),
          }
        })
      })
      .flat()

    createdSeasonalPrices = await tx.seasonalPrice.createMany({
      data: dataToCreateSeasonalPrices,
    })
  })

  return {
    updatedSeasons: createdSeasons,
    updatedSeasonalPrices: createdSeasonalPrices,
  }
}

export const deletePropertySeasonService = async ({
  id,
  role,
  slug,
  seasonId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> &
  Pick<ISeasonalPrice, 'seasonId'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
      },
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypesExist = await prisma.propertyRoomType.findMany({
    where: {
      id: {
        in: isPropertyExist?.propertyRoomType.map((item) => item?.id),
      },
      deletedAt: null,
    },
  })

  if (isPropertyRoomTypesExist.length <= 0)
    throw { msg: 'Room type not found!', status: 406 }

  const isSeasonExist = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
  })

  if (!isSeasonExist?.id) throw { msg: 'Season not found!', status: 406 }

  const getSeasons = await prisma.season.findMany({
    where: {
      name: isSeasonExist?.name,
      endDate: isSeasonExist?.endDate,
      startDate: isSeasonExist?.startDate,
      ratesPercentage: isSeasonExist?.ratesPercentage,
    },
  })

  let createdSeasons: any, createdSeasonalPrices
  await prisma.$transaction(async (tx) => {
    try {
      const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
        where: {
          seasonId: {
            in: getSeasons.map((item) => item.id),
          },
        },
      })

      const deletedSeason = await tx.season.deleteMany({
        where: {
          id: {
            in: getSeasons.map((item) => item.id),
          },
        },
      })
    } catch (error) {
      throw { msg: 'Delete season failed!', status: 500 }
    }
  })
}

export const deleteSeasonalPriceService = async ({
  id,
  role,
  propertyRoomTypeId,
  seasonalPriceId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeason, 'propertyRoomTypeId'> & { seasonalPriceId: number }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room type not found!', status: 406 }

  const isSeasonalPriceExist = await prisma.seasonalPrice.findUnique({
    where: {
      id: Number(seasonalPriceId),
    },
  })

  await prisma.$transaction(async (tx) => {
    try {
      const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
        where: {
          id: isSeasonalPriceExist?.id,
        },
      })
    } catch (error) {
      throw { msg: 'Delete season failed!', status: 500 }
    }
  })
}

export const getSeasonsByPropertyRoomTypeService = async ({
  id,
  role,
  month,
  propertyRoomTypeId,
  year,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeason, 'propertyRoomTypeId'> & { month: number; year: number }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        where: {
          id: Number(propertyRoomTypeId),
        },
        include: {
          season: true,
        },
        orderBy: {
          price: 'asc',
        },
      },
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }
  if (isPropertyExist?.propertyRoomType.length <= 0)
    throw { msg: 'Room type not found!', status: 406 }

  const startDate = new Date(Number(year), Number(month), 0)
  const endDate = addYears(new Date(Number(year), Number(month), 0), 1)

  const getSeasons = await prisma.seasonalPrice.findMany({
    where: {
      propertyRoomTypeId: Number(propertyRoomTypeId),
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    include: {
      season: true,
    },
  })

  const findPropertySeasonalPrice = await prisma.season.findMany({
    where: {
      id: {
        in: isPropertyExist?.propertyRoomType[0]?.season.map(
          (item) => item?.id,
        ),
      },
    },
    include: {
      seasonalPrice: true,
    },
  })

  return {
    property: isPropertyExist,
    seasons: getSeasons,
    propertySeasons: findPropertySeasonalPrice,
  }
}

export const updateSingleSeasonService = async ({
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
  seasonId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeason, 'propertyRoomTypeId' | 'name' | 'availability' | 'isPeak'> &
  Pick<ISeasonalPrice, 'seasonId'> & {
    startDate: string
    endDate: string
    roomPrices: number
    roomsToSell: number
    pricePercentage: number
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
      },
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypesExist = await prisma.propertyRoomType.findMany({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (isPropertyRoomTypesExist.length <= 0)
    throw { msg: 'Room type not found!', status: 406 }

  const isSeasonExist = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
  })

  if (!isSeasonExist?.id) throw { msg: 'Season not found!', status: 406 }

  let createdSeason: any, createdSeasonalPrices
  await prisma.$transaction(async (tx) => {
    const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
      where: {
        seasonId: isSeasonExist?.id,
      },
    })

    const deletedSeason = await tx.season.deleteMany({
      where: {
        id: isSeasonExist?.id,
      },
    })

    createdSeason = await tx.season.create({
      data: {
        propertyRoomTypeId: Number(propertyRoomTypeId),
        propertyId: isPropertyExist?.id,
        name,
        isPeak,
        availability,
        ratesPercentage: Number(pricePercentage),
        roomToRent: Number(roomsToSell),
        startDate: new Date(startDate.split('T')[0]).toISOString(),
        endDate: new Date(endDate.split('T')[0]).toISOString(),
      },
    })

    if (createdSeason?.length <= 0)
      throw { msg: 'Update season room type failed!', status: 500 }

    const price = Number(roomPrices)
    const totalRooms = roomsToSell
    const dataToCreateSeasonalPrices = Array.from({
      length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
    }).map((_, index) => {
      return {
        price,
        propertyId: isPropertyExist?.id,
        seasonId: createdSeason?.id,
        propertyRoomTypeId: createdSeason?.propertyRoomTypeId,
        roomAvailability: availability,
        isPeak,
        isStartSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(startDate.split('T')[0]).toISOString(),
        ),
        isEndSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(endDate.split('T')[0]).toISOString(),
        ),
        roomToRent: totalRooms,
        date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
      }
    })

    createdSeasonalPrices = await tx.seasonalPrice.createMany({
      data: dataToCreateSeasonalPrices,
    })
  })

  return {
    updatedSeasons: createdSeason,
    updatedSeasonalPrices: createdSeasonalPrices,
  }
}

export const createOneSeasonService = async ({
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
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeason, 'propertyRoomTypeId' | 'name' | 'availability' | 'isPeak'> & {
    startDate: string
    endDate: string
    roomPrices: number
    roomsToSell: number
    pricePercentage: number
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
      },
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypesExist = await prisma.propertyRoomType.findMany({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (isPropertyRoomTypesExist.length <= 0)
    throw { msg: 'Room type not found!', status: 406 }

  let createdSeason: any, createdSeasonalPrices
  await prisma.$transaction(async (tx) => {
    createdSeason = await tx.season.create({
      data: {
        propertyRoomTypeId: Number(propertyRoomTypeId),
        propertyId: isPropertyExist?.id,
        name,
        isPeak,
        availability,
        ratesPercentage: Number(pricePercentage),
        roomToRent: Number(roomsToSell),
        startDate: new Date(startDate.split('T')[0]).toISOString(),
        endDate: new Date(endDate.split('T')[0]).toISOString(),
      },
    })

    if (createdSeason?.length <= 0)
      throw { msg: 'Update season room type failed!', status: 500 }

    const price = Number(roomPrices)
    const totalRooms = roomsToSell
    const dataToCreateSeasonalPrices = Array.from({
      length: differenceInDays(new Date(endDate), new Date(startDate)) + 1,
    }).map((_, index) => {
      return {
        price,
        propertyId: isPropertyExist?.id,
        seasonId: createdSeason?.id,
        propertyRoomTypeId: createdSeason?.propertyRoomTypeId,
        roomAvailability: availability,
        isPeak,
        isStartSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(startDate.split('T')[0]).toISOString(),
        ),
        isEndSeason: Boolean(
          new Date(addDays(startDate.split('T')[0], index)).toISOString() ===
            new Date(endDate.split('T')[0]).toISOString(),
        ),
        roomToRent: totalRooms,
        date: new Date(addDays(startDate.split('T')[0], index)).toISOString(),
      }
    })

    createdSeasonalPrices = await tx.seasonalPrice.createMany({
      data: dataToCreateSeasonalPrices,
    })
  })

  return {
    createdSeasons: createdSeason,
    createdSeasonalPrices: createdSeasonalPrices,
  }
}

export const deleteSingleSeasonService = async ({
  id,
  role,
  seasonId,
  propertyRoomTypeId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<ISeason, 'propertyRoomTypeId'> &
  Pick<ISeasonalPrice, 'seasonId'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      deletedAt: null,
    },
    select: {
      id: true,
      tenantId: true,
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room type not found!', status: 406 }

  const isSeasonExist = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
  })

  if (!isSeasonExist?.id) throw { msg: 'Season not found!', status: 406 }

  await prisma.$transaction(async (tx) => {
    try {
      const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
        where: {
          seasonId: isSeasonExist?.id,
        },
      })

      const deletedSeason = await tx.season.deleteMany({
        where: {
          id: isSeasonExist?.id,
        },
      })
    } catch (err) {
      throw { msg: 'Delete season room type failed!', status: 500 }
    }
  })
}

export const getSingleSeasonService = async ({
  id,
  role,
  seasonId,
}: Pick<IUser, 'id' | 'role'> & Pick<ISeasonalPrice, 'seasonId'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null
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
      season: {
        some: {
          id: Number(seasonId),
        },
      },
      deletedAt: null,
    },
    include: {
      propertyRoomType: {
        include: {
          season: true,
        },
        orderBy: {
          price: 'asc',
        },
      },
    },
  })

  if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const findPropertySeasonalPrice = await prisma.season.findUnique({
    where: {
      id: Number(seasonId),
    },
    include: {
      seasonalPrice: true,
      property: true,
      propertyRoomType: true,
    },
  })

  return {
    property: isPropertyExist,
    propertySeason: findPropertySeasonalPrice,
  }
}
