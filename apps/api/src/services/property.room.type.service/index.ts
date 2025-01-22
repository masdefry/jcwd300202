import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/connection'
import { addDays, differenceInDays } from 'date-fns'
import { deleteFiles } from '@/utils/deleteFiles'
import { comparePassword } from '@/utils/hashPassword'
import { IProperty } from '../property.service/types'
import { IPropertyRoomType } from './types'
import { IUser } from '../auth.service/types'

export const getPropertyRoomTypeService = async ({ roomTypeId }: { roomTypeId: string }) => {
  const propertyRoomType = await prisma.propertyRoomType.findMany({

    where: {
      id: Number(roomTypeId),
      deletedAt: null,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
      property: {
        select: {
          tenantId: true,
          name: true,
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
  })

  return {
    propertyRoomType,
  }
}
export const getSinglePropertyRoomTypeByTenantService = async ({ roomTypeId, id, role }: { roomTypeId: string } & Pick<IUser , 'id' | 'role'>) => {
  
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }
  
  const propertyRoomType = await prisma.propertyRoomType.findMany({

    where: {
      id: Number(roomTypeId),
      deletedAt: null,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
      property: {
        select: {
          tenantId: true,
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
  })

  if (!propertyRoomType[0]?.id || propertyRoomType[0]?.deletedAt)
    throw { msg: 'Room type not found!', status: 404 }
  if (propertyRoomType[0]?.property?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  return {
    propertyRoomType,
  }
}

export const getPropertyRoomTypeByPropertyService = async ({
  limit,
  offset,
  checkInDate,
  checkOutDate,
  children,
  adult,
  slug,
}: {
  limit: string | number
  offset: string | number
  checkInDate: string
  checkOutDate: string
  children: string
  adult: string
} & Pick<IProperty, 'slug'>) => {
  const capacity = Number(adult) + Number(children)
  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }

  let gteDate =
    checkInDate && checkInDate != 'undefined'
      ? new Date(checkInDate as string)
      : new Date()
  gteDate.setHours(0, 0, 0, 0)
  let ltDate =
    checkOutDate && checkOutDate != 'undefined'
      ? new Date(checkOutDate as string)
      : addDays(gteDate, 1)
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
  const whereCondition = []
  if (capacity) {
    whereCondition.push({
      capacity: {
        gte: Number(capacity),
      },
    })
  }
  const propertyRoomType = await prisma.propertyRoomType.findMany({
    where: {
      propertyId: isPropertyExist?.id,
      deletedAt: null,
      AND: whereCondition,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
      season: {
        include: {
          seasonalPrice: true,
        },
      },
      seasonalPrice: {
        orderBy: {
          date: 'asc',
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
    take: Number(limit),
    skip: Number(offset),
  })

  const countAllRooms = await prisma.propertyRoomType.count({
    where: {
      propertyId: isPropertyExist?.id,
      deletedAt: null,
      AND: whereCondition,
    },
  })

  const totalPage = Math.ceil(countAllRooms / Number(limit))

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

  const seasonalPriceListView = propertyRoomType.map((room, roomIdx) => {
    return {
      id: room?.id,
      name: room?.name,
      price: room?.price,
      totalRooms: room?.totalRooms,
      seasonalPriceListView: Array.from({ length: 31 }).map((_, idx) => {
        return {}
      }),
    }
  })

  const seasonalPrice = await prisma.seasonalPrice.findMany({
    where: {
      propertyId: isPropertyExist?.id,
      date: dataPeriod,
    },
  })

  let dateForFiltering = [
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ).toISOString(),
  ]
  if (checkInDate && checkOutDate) {
    dateForFiltering = Array.from({
      length: differenceInDays(
        new Date(checkOutDate as string),
        new Date(checkInDate as string),
      ),
    }).map((_, index) => {
      return addDays(new Date(checkInDate as string), index).toISOString()
    })
  }

  const transactions = await prisma.transactionStatus.findMany({
    where: {
      AND: [
        {
          transaction: {
            propertyId: isPropertyExist?.id,
          },
        },
        {
          status: {
            in: ['PAID', 'WAITING_FOR_CONFIRMATION_PAYMENT'],
          },
        },
      ],
      roomFilled: {
        some: {
          date: dataPeriod,
        },
      },
    },
    include: {
      transaction: {
        include: {
          room: true,
        },
      },
    },
  })

  const propertyRoomTypeWithSeasonalPrice = propertyRoomType.map(
    (item, index) => {
      let totalPrice = 0
      const seasonalPriceByPropertyRoomTypeLength = seasonalPrice.filter(
        (itm) => itm?.propertyRoomTypeId === item?.id,
      ).length
      let seasonalPriceByPropertyRoomType = 0
      let isAvailable = true
      if (seasonalPriceByPropertyRoomTypeLength > 0) {
        seasonalPriceByPropertyRoomType = seasonalPrice
          .filter((itm) => itm?.propertyRoomTypeId === item?.id)
          .map((itm) => itm.price)
          .reduce((acc, curr) => acc + curr)
        isAvailable = seasonalPrice
          .filter((itm) => itm?.propertyRoomTypeId === item?.id)
          .map((itm) => itm.roomAvailability)
          .every((itm) => itm)
      }
      const transactionsByPropertyRoomTypeLength = transactions.filter(
        (itm) => itm?.transaction?.roomId === item?.id,
      ).length
      const totalRoomsLeft =
        item?.totalRooms - transactionsByPropertyRoomTypeLength
      let totalDays = 1
      if (checkInDate && checkOutDate) {
        totalDays = Math.abs(
          differenceInDays(checkInDate as string, checkOutDate as string),
        )
      }
      const normalTotalPrice = totalDays * item?.price
      totalPrice =
        (totalDays - seasonalPriceByPropertyRoomTypeLength) * item.price +
        seasonalPriceByPropertyRoomType
      return {
        ...item,
        totalPrice,
        totalDays,
        seasonalPriceByPropertyRoomType,
        normalTotalPrice,
        isAvailable,
        totalRoomsLeft,
        totalNights: differenceInDays(ltDate, gteDate),
      }
    },
  )
  return {
    propertyRoomTypeWithSeasonalPrice,
    propertyRoomType,
    isIncludeBreakfast,
    totalPage,
    pageInUse,
  }
}
export const getPropertyRoomTypeByTenantService = async ({
  id,
  role,
  checkInDate,
  checkOutDate,
  children,
  adult,
  slug,
}: {
  checkInDate: string
  checkOutDate: string
  children: string
  adult: string
} & Pick<IProperty, 'slug'> & Pick<IUser, 'id' | 'role'>) => {

  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const capacity = Number(adult) + Number(children)
  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let gteDate =
    checkInDate && checkInDate != 'undefined'
      ? new Date(checkInDate as string)
      : new Date()
  gteDate.setHours(0, 0, 0, 0)
  let ltDate =
    checkOutDate && checkOutDate != 'undefined'
      ? new Date(checkOutDate as string)
      : addDays(gteDate, 1)
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
  const whereCondition = []
  if (capacity) {
    whereCondition.push({
      capacity: {
        gte: Number(capacity),
      },
    })
  }
  const propertyRoomType = await prisma.propertyRoomType.findMany({
    where: {
      propertyId: isPropertyExist?.id,
      deletedAt: null,
      AND: whereCondition,
    },
    include: {
      propertyRoomImage: true,
      roomHasFacilities: {
        include: {
          propertyRoomFacility: true,
        },
      },
      season: {
        include: {
          seasonalPrice: true,
        },
      },
      seasonalPrice: {
        orderBy: {
          date: 'asc',
        },
      },
    },
    orderBy: {
      price: 'asc',
    },
  })

  const countAllRooms = await prisma.propertyRoomType.count({
    where: {
      propertyId: isPropertyExist?.id,
      deletedAt: null,
      AND: whereCondition,
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

  const seasonalPriceListView = propertyRoomType.map((room, roomIdx) => {
    return {
      id: room?.id,
      name: room?.name,
      price: room?.price,
      totalRooms: room?.totalRooms,
      seasonalPriceListView: Array.from({ length: 31 }).map((_, idx) => {
        return {}
      }),
    }
  })

  const seasonalPrice = await prisma.seasonalPrice.findMany({
    where: {
      propertyId: isPropertyExist?.id,
      date: dataPeriod,
    },
  })

  let dateForFiltering = [
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ).toISOString(),
  ]
  if (checkInDate && checkOutDate) {
    dateForFiltering = Array.from({
      length: differenceInDays(
        new Date(checkOutDate as string),
        new Date(checkInDate as string),
      ),
    }).map((_, index) => {
      return addDays(new Date(checkInDate as string), index).toISOString()
    })
  }

  const transactions = await prisma.transactionStatus.findMany({
    where: {
      AND: [
        {
          transaction: {
            propertyId: isPropertyExist?.id,
          },
        },
        {
          status: {
            in: ['PAID', 'WAITING_FOR_CONFIRMATION_PAYMENT'],
          },
        },
      ],
      roomFilled: {
        some: {
          date: dataPeriod,
        },
      },
    },
    include: {
      transaction: {
        include: {
          room: true,
        },
      },
    },
  })

  const propertyRoomTypeWithSeasonalPrice = propertyRoomType.map(
    (item, index) => {
      let totalPrice = 0
      const seasonalPriceByPropertyRoomTypeLength = seasonalPrice.filter(
        (itm) => itm?.propertyRoomTypeId === item?.id,
      ).length
      let seasonalPriceByPropertyRoomType = 0
      let isAvailable = true
      if (seasonalPriceByPropertyRoomTypeLength > 0) {
        seasonalPriceByPropertyRoomType = seasonalPrice
          .filter((itm) => itm?.propertyRoomTypeId === item?.id)
          .map((itm) => itm.price)
          .reduce((acc, curr) => acc + curr)
        isAvailable = seasonalPrice
          .filter((itm) => itm?.propertyRoomTypeId === item?.id)
          .map((itm) => itm.roomAvailability)
          .every((itm) => itm)
      }
      const transactionsByPropertyRoomTypeLength = transactions.filter(
        (itm) => itm?.transaction?.roomId === item?.id,
      ).length
      const totalRoomsLeft =
        item?.totalRooms - transactionsByPropertyRoomTypeLength
      let totalDays = 1
      if (checkInDate && checkOutDate) {
        totalDays = Math.abs(
          differenceInDays(checkInDate as string, checkOutDate as string),
        )
      }
      const normalTotalPrice = totalDays * item?.price
      totalPrice =
        (totalDays - seasonalPriceByPropertyRoomTypeLength) * item.price +
        seasonalPriceByPropertyRoomType
      return {
        ...item,
        totalPrice,
        totalDays,
        seasonalPriceByPropertyRoomType,
        normalTotalPrice,
        isAvailable,
        totalRoomsLeft,
        totalNights: differenceInDays(ltDate, gteDate),
      }
    },
  )
  return {
    propertyRoomTypeWithSeasonalPrice,
    propertyRoomType,
    isIncludeBreakfast,
  }
}

export const updatePropertyRoomTypeGeneralService = async ({
  name,
  totalRooms,
  rooms,
  bathrooms,
  capacity,
  price,
  id,
  role,
  propertyRoomTypeId,
  slug,
}: Pick<
  IPropertyRoomType,
  'name' | 'totalRooms' | 'rooms' | 'bathrooms' | 'capacity' | 'price'
> &
  Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & { propertyRoomTypeId: string | number }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Property room type not found!', status: 404 }

  let updatedPropertyRoomTypeGeneral
  await prisma.$transaction(async(tx) => {
    try {
      updatedPropertyRoomTypeGeneral = await tx.propertyRoomType.update({
        where: {
          id: Number(propertyRoomTypeId),
        },
        data: {
          name,
          totalRooms,
          rooms,
          bathrooms,
          capacity,
          price,
        },
      })
    
      const findLowestPriceRoomType = await tx.propertyRoomType.findMany({
        where: {
          deletedAt: null,
          propertyId: isPropertyExist?.id
        },
        orderBy: {
          price: 'asc'
        }
      })
    
      const updateLowestPriceProperty = await tx.property.update({
        where: {
          id: isPropertyExist?.id
        },
        data: {
          price: findLowestPriceRoomType[0].price,
        }
      })
    } catch (err) {
      throw { msg: 'Update property room type failed!', status: 500 }
    }
  },
  {
    timeout: 25000
  })

  return { updatedPropertyRoomTypeGeneral }
}

export const createPropertyRoomTypeService = async ({
  id,
  role,
  slug,
  name,
  description,
  rooms,
  capacity,
  bathrooms,
  price,
  totalRooms,
  imagesUploaded,
  propertyRoomFacilitiesId,
}: Pick<
  IPropertyRoomType,
  | 'name'
  | 'totalRooms'
  | 'rooms'
  | 'bathrooms'
  | 'capacity'
  | 'price'
  | 'description'
> &
  Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & {
    imagesUploaded: any
    propertyRoomFacilitiesId: any
  }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let createdPropertyRoomType: any
  await prisma.$transaction(
    async (tx) => {
      try {
        createdPropertyRoomType = await tx.propertyRoomType.create({
          data: {
            name,
            description,
            rooms: Number(rooms),
            capacity: Number(capacity),
            bathrooms: Number(bathrooms),
            price: Number(price),
            totalRooms: Number(totalRooms),
            propertyId: isPropertyExist?.id,
          },
        })

        if (!createdPropertyRoomType?.id)
          throw { msg: 'Create property room type failed!', status: 500 }

        const dataCreatedRoomHasFacilities = JSON.parse(
          propertyRoomFacilitiesId,
        ).map((item: number | string) => {
          return {
            propertyRoomTypeId: createdPropertyRoomType?.id,
            propertyRoomFacilityId: Number(item),
          }
        })

        const createdRoomHasFacilities = await tx.roomHasFacilities.createMany({
          data: dataCreatedRoomHasFacilities,
        })

        if (!createdRoomHasFacilities)
          throw { msg: 'Create room has facilities failed!', status: 500 }
        const dataForCreatePropertyRoomImages = imagesUploaded.map(
          (item: any) => {
            return {
              directory: item?.destination,
              filename: item?.filename.split('.')[0],
              fileExtension: item?.filename.split('.')[1],
              propertyRoomTypeId: createdPropertyRoomType?.id,
            }
          },
        )

        const createdPropertyRoomImages = await tx.propertyRoomImage.createMany(
          {
            data: dataForCreatePropertyRoomImages,
          },
        )

        if (!createdPropertyRoomImages)
          throw { msg: 'Upload room type images failed!', status: 500 }

        const findLowestPriceRoomType = await tx.propertyRoomType.findMany({
          where: {
            deletedAt: null,
            propertyId: isPropertyExist?.id
          },
          orderBy: {
            price: 'asc'
          }
        })
  
        const updateLowestPriceProperty = await tx.property.update({
          where: {
            id: isPropertyExist?.id
          },
          data: {
            price: findLowestPriceRoomType[0].price
          }
        })
      } catch (error) {
        console.log(error)
        throw { msg: 'Connection failed!', status: 500 }
      }
    },
    {
      timeout: 30000,
    },
  )

  return { createdPropertyRoomType }
}

export const deletePropertyRoomTypeService = async ({
  id,
  role,
  password,
  slug,
  propertyRoomTypeId,
}: Pick<IUser, 'id' | 'role' | 'password'> &
  Pick<IProperty, 'slug'> & { propertyRoomTypeId: string | number }) => {
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

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Property room type not found!', status: 404 }

  const getPropertyRoomImages = await prisma.propertyRoomImage.findMany({
    where: {
      propertyRoomTypeId: Number(propertyRoomTypeId),
    },
  })

  const propertyRoomImagesToDelete = {
    images: getPropertyRoomImages.map((item) => {
      return {
        destination: item?.directory,
        filename: `${item?.filename}.${item?.fileExtension}`,
      }
    }),
  }

  await prisma.$transaction(
    async (tx) => {
      try {
        

        const deletedRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId),
          },
        })

        const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId),
          },
        })

        const deletedSeason = await tx.season.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId),
          },
        })

        const deletedPropertyRoomImages = await tx.propertyRoomImage.deleteMany(
          {
            where: {
              propertyRoomTypeId: Number(propertyRoomTypeId),
            },
          },
        )

        const softDeletePropertyRoomType = await tx.propertyRoomType.update({
          where: {
            id: Number(propertyRoomTypeId),
          },
          data: {
            deletedAt: new Date().toISOString(),
          },
        })

        const findLowestPriceRoomType = await tx.propertyRoomType.findMany({
          where: {
            deletedAt: null,
            propertyId: isPropertyExist?.id
          },
          orderBy: {
            price: 'asc'
          }
        })
      
        const updateLowestPriceProperty = await tx.property.update({
          where: {
            id: isPropertyExist?.id
          },
          data: {
            price: findLowestPriceRoomType[0].price
          }
        })

        deleteFiles({ imagesUploaded: propertyRoomImagesToDelete })
      } catch (err) {
        throw { msg: 'Delete room type failed!', status: 500 }
      }
    },
    {
      timeout: 25000,
    },
  )
}
