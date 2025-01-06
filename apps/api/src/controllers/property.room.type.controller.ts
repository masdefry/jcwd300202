import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/connection'
import { addDays, differenceInDays } from 'date-fns'

export const getPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

        const propertyRoomType = await prisma.propertyRoomType.findMany({
            where: {
                id: Number(id)
            },
            include: {
                propertyRoomImage: true,
                roomHasFacilities: {
                    include: {
                        propertyRoomFacility: true
                    }
                },
                property: {
                    select: {
                        tenantId: true
                    }
                }
            },
            orderBy: {
                price: 'asc'
            },
        })

        res.status(200).json({
            error: false,
            message: 'Get property room type success',
            data: {
                propertyRoomType
            }
        })

    // const propertyRoomType = await prisma.propertyRoomType.findMany({
    //   where: {
    //     id: Number(id),
    //   },
    //   include: {
    //     propertyRoomImage: true,
    //     roomHasFacilities: {
    //       include: {
    //         propertyRoomFacility: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     price: 'asc',
    //   },
    // })


    res.status(200).json({
      error: false,
      message: 'Get property room type success',
      data: {
        propertyRoomType,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getPropertyRoomTypeByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params
    const { limit = 2, offset = 0, checkInDate, checkOutDate } = req.query

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }

    // const whereCondition = [
    //     date && new Date(date as string) ? {
    //         seasonalPrice: {
    //             some: {
    //                 date: new Date(date as string).toISOString()
    //             }
    //         }
    //     }: null,
    //     ( month && !isNaN(Number(month))) && ( year && !isNaN(Number(year))) ? {
    //         seasonalPrice: {
    //             some: {
    //                 date: {
    //                     lt: new Date(Number(year), Number(month) + 1, 0).toISOString(),
    //                     gte: new Date(Number(year), Number(month), 0).toISOString()
    //                 }
    //             }
    //         }
    //     }: null
    // ].filter(item => item !== null)

    const propertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        propertyId: isPropertyExist?.id,
        // OR: [
        //     {
        //         seasonalPrice: {
        //             some: {
        //                 date: new Date(date as string).toISOString()
        //             }
        //         }
        //     },
        //     {
        //         seasonalPrice: {
        //             some: {
        //                 date: {
        //                     lt: new Date(Number(year), Number(month) + 1, 0).toISOString(),
        //                     gte: new Date(Number(year), Number(month), 0).toISOString()
        //                 }
        //             }
        //         }
        //     }
        // ]
        // OR: whereCondition
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

    // let seasonalPrice = await prisma.property.findMany({
    //     where: {
    //         id: isPropertyExist?.id
    //     },
    //     include: {
    //         propertyRoomType: {
    //             include: {
    //                 season: {
    //                     include: {
    //                         seasonalPrice: true
    //                     }
    //                 },
    //                 seasonalPrice: true
    //             }
    //         }
    //     }
    // })

            // const isPropertyExist = await prisma.property.findFirst({
            //     where: {
            //         slug
            //     }, 
            //     select: {
            //         id: true,
            //         tenantId: true,
            //         deletedAt: true
            //     }
            // })

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


    // let tes, tesfind
    // propertyRoomType.forEach((item, index) => {
    //      tesfind = item.seasonalPrice.find(season => season.date === new Date(2024, 11, 28))
    //      tes = item.seasonalPrice.findIndex(season => season.date === new Date(2024, 11, 28))
    //     if(tes > -1) {
    //         console.log('>>>>:', tes)
    //         console.log('tesFind:', tesfind)
    //     }
    // })

    const seasonalPrice = await prisma.seasonalPrice.findMany({
      where: {
        propertyId: isPropertyExist?.id,
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
            date: {
              gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
              ).toISOString(),
              lte: addDays(
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                ),
                1,
              ).toISOString(),
            },
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
        if (seasonalPriceByPropertyRoomTypeLength > 0) {
          seasonalPriceByPropertyRoomType = seasonalPrice
            .filter((itm) => itm?.propertyRoomTypeId === item?.id)
            .map((itm) => itm.price)
            .reduce((acc, curr) => acc + curr)
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
          totalRoomsLeft,
        }
      },
    )
    res.status(200).json({
      message: 'Successfully fetch room type by property',
      error: false,
      data: {
        propertyRoomTypeWithSeasonalPrice,
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

export const updatePropertyRoomTypeGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, totalRooms, rooms, bathrooms, capacity, price, id, role, propertyRoomTypeId } = req.body
    const { slug } = req.params

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 406 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
        throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
        where: {
            id: Number(propertyRoomTypeId)
        }
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Property room type not found!', status: 406 }

    const updatedPropertyRoomTypeGeneral = await prisma.propertyRoomType.update({
        where: {
            id: Number(propertyRoomTypeId)
        },
        data: {
            name, 
            totalRooms, 
            rooms, 
            bathrooms, 
            capacity, 
            price
        }
    })

    if(updatedPropertyRoomTypeGeneral?.id) throw { msg: 'Update property room type failed!', status: 500 }

    res.status(200).json({
        error: false,
        message: 'Update property room type success',
        data: updatedPropertyRoomTypeGeneral
    })

  } catch (error) {
    next(error)
  }
}
