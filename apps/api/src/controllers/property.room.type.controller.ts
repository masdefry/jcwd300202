import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/connection'
import { addDays, differenceInDays } from 'date-fns'
import { deleteFiles } from '@/utils/deleteFiles'
import { comparePassword } from '@/utils/hashPassword'

export const getPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    const propertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        id: Number(id),
        deletedAt: null
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

    res.status(200).json({
      error: false,
      message: 'Get property room type success',
      data: {
        propertyRoomType,
      },
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
    const { limit = 2, offset = 0, checkInDate, checkOutDate, capacity } = req.query

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }

let gteDate = checkInDate && checkInDate != 'undefined' ? new Date(checkInDate as string) : new Date();
    gteDate.setHours(0, 0, 0, 0);
    let ltDate = checkOutDate && checkOutDate != 'undefined' ? new Date(checkOutDate as string) : addDays(gteDate, 1);
    ltDate.setHours(0, 0, 0, 0);

    let dataPeriod = {}
    if (isNaN(gteDate.getTime()) || isNaN(ltDate.getTime())) {
      throw { msg: 'Date range invalid!', status: 406 }
    } else {
    dataPeriod = {
        gte: gteDate.toISOString(),
        lt: ltDate.toISOString()
      }
    }
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
    const whereCondition = []
    if(capacity) {
      whereCondition.push({
        capacity: {
          gte: Number(capacity)
        }
      })
    }
    const propertyRoomType = await prisma.propertyRoomType.findMany({
      where: {
        propertyId: isPropertyExist?.id,
        deletedAt: null,
        AND: whereCondition
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
        deletedAt: null,
        AND: whereCondition
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
        // date: {
        //   gte: checkInDate
        //     ? new Date(checkInDate as string).toISOString()
        //     : new Date(
        //         new Date().getFullYear(),
        //         new Date().getMonth(),
        //         new Date().getDate(),
        //       ).toISOString(),
        //   lt: checkOutDate
        //     ? new Date(checkOutDate as string).toISOString()
        //     : addDays(
        //         new Date(
        //           new Date().getFullYear(),
        //           new Date().getMonth(),
        //           new Date().getDate(),
        //         ),
        //         1,
        //       ).toISOString(),
        // },
        date: dataPeriod  
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
            date: dataPeriod
            // date: {
            //   gte: new Date(
            //     new Date().getFullYear(),
            //     new Date().getMonth(),
            //     new Date().getDate(),
            //   ).toISOString(),
            //   lte: addDays(
            //     new Date(
            //       new Date().getFullYear(),
            //       new Date().getMonth(),
            //       new Date().getDate(),
            //     ),
            //     1,
            //   ).toISOString(),
            // },
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
            .every(itm => itm)
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
          totalNights: differenceInDays(ltDate, gteDate)
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
    console.log(error)
    next(error)
  }
}

export const updatePropertyRoomTypeGeneral = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      totalRooms,
      rooms,
      bathrooms,
      capacity,
      price,
      id,
      role,
      propertyRoomTypeId,
    } = req.body
    const { slug } = req.params

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
        deletedAt: null
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Property room type not found!', status: 406 }

    const updatedPropertyRoomTypeGeneral = await prisma.propertyRoomType.update(
      {
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
      },
    )

    if (!updatedPropertyRoomTypeGeneral?.id)
      throw { msg: 'Update property room type failed!', status: 500 }

    res.status(200).json({
      error: false,
      message: 'Update property room type success',
      data: updatedPropertyRoomTypeGeneral,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const createPropertyRoomType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      id,
      role,
      name,
      description,
      rooms,
      capacity,
      bathrooms,
      price,
      totalRooms,
      propertyRoomFacilitiesId
    } = req.body

    const { slug } = req.params
    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 406 }
    const imagesUploaded: any = req?.files?.images

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }


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
          
          const dataCreatedRoomHasFacilities = JSON.parse(propertyRoomFacilitiesId).map((item: number | string) => {
            return {
              propertyRoomTypeId: createdPropertyRoomType?.id,
              propertyRoomFacilityId: Number(item)
            }
          })
              
              const createdRoomHasFacilities = await tx.roomHasFacilities.createMany({
                data: dataCreatedRoomHasFacilities  
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

          const createdPropertyRoomImages =
            await tx.propertyRoomImage.createMany({
              data: dataForCreatePropertyRoomImages,
            })
            
          if (!createdPropertyRoomImages)
            throw { msg: 'Upload room type images failed!', status: 500 }
        } catch (error) {
          console.log(error)
          throw { msg: 'Connection failed!', status: 500 }
        }
      },
      {
        timeout: 10000,
      },
    )

    res.status(201).json({
      error: false,
      message: 'Create property room type success',
      data: createdPropertyRoomType,
    })
  } catch (error) {
    next(error)
  }
}

export const deletePropertyRoomType = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role, password } = req.body
    const { slug } = req.params
    const { propertyRoomTypeId } = req.query
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    const comparingPassword = await comparePassword(password, isTenantExist?.password as string)
    if(!comparingPassword) throw { msg: 'Password invalid!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }


    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
      include: {
        propertyDetail: true,
        propertyRoomType: true
      },
    })

    if (!isPropertyExist?.id) throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(propertyRoomTypeId),
        deletedAt: null
      },
    })

    if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
      throw { msg: 'Property room type not found!', status: 406 }

    const getPropertyRoomImages = await prisma.propertyRoomImage.findMany({
      where: {
        propertyRoomTypeId: Number(propertyRoomTypeId)
      }
    })
    
    const propertyRoomImagesToDelete = {
      images: getPropertyRoomImages.map(item => {
        return {
          destination: item?.directory,
          filename: `${item?.filename}.${item?.fileExtension}`
        }
      }) 
    }

        console.log('>>>>>>', propertyRoomImagesToDelete)

    await prisma.$transaction(async(tx) => {
      try {

        const deletedRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId)
          }
        })

        const deletedSeasonalPrice = await tx.seasonalPrice.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId)
          }
        })

        const deletedSeason = await tx.season.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId)
          }
        })

        const deletedPropertyRoomImages = await tx.propertyRoomImage.deleteMany({
          where: {
            propertyRoomTypeId: Number(propertyRoomTypeId)
          }
        })


        const softDeletePropertyRoomType = await tx.propertyRoomType.update({
          where: {
            id: Number(propertyRoomTypeId)
          },
          data: {
            deletedAt: new Date().toISOString()
          }
        })

        deleteFiles({ imagesUploaded: propertyRoomImagesToDelete })
      } catch (err) {
        throw { msg: 'Delete room type failed!', status: 500 }
      }

    },
    {
      timeout: 25000
    })


    res.status(200).json({
      error: false,
      message: 'Delete room type success',
      data: {}
    })

  } catch (err) {
    console.log(err)
    next(err)
  }
}