import { Request, Response, NextFunction } from 'express';
import { prisma } from "@/connection"; 

export const getPropertyRoomType = async(req: Request, res: Response, next: NextFunction) => {
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

    } catch (error) {
        next(error)
    }
}

export const getPropertyRoomTypeByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
            const { slug } = req.params
            const { limit = 2, offset = 0, 
                // date, month, year 
            } = req.query

            const isPropertyExist = await prisma.property.findFirst({
                where: {
                    slug
                }
            })

            if(!isPropertyExist?.id || isPropertyExist?.deletedAt) throw { msg: 'Property not found!', status: 406 }

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
                            propertyRoomFacility: true
                        }
                    },
                    season: {
                        include: {
                            seasonalPrice: true,
                        }
                    },
                    seasonalPrice: {
                        orderBy: {
                            date: 'asc'
                        }
                    }
                },
                orderBy: {
                    price: 'asc'
                },
                take: Number(limit),
                skip: Number(offset)
            })
    
            const countAllRooms = await prisma.propertyRoomType.count({
                where: {
                    propertyId: isPropertyExist?.id
                }
            })
    
            const totalPage = Math.ceil(countAllRooms / Number(limit))
    
            const roomHasBreakfast = await prisma.roomHasFacilities.findMany({
                where: {
                  propertyRoomTypeId: {
                    in: propertyRoomType.map(item => item.id)
                  },
                  propertyRoomFacility: {
                    name: "Breakfast"
                  }
                },
                orderBy: {
                    propertyRoomType: {
                        price: 'asc'
                    }
                },
                include: {
                  propertyRoomFacility: true
                },
              });
            
            const roomHasBreakfastId = roomHasBreakfast.map(item => item.propertyRoomTypeId) 
            const isIncludeBreakfast = propertyRoomType.map(item => {
                if(roomHasBreakfastId.includes(item.id)) {
                    return true
                } else {
                    return false
                }
            }) 
    
            const pageInUse = (Number(offset)/2) + 1

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

            const seasonalPriceListView = propertyRoomType.map((room, roomIdx) => {
                return {
                    id: room?.id,
                    name: room?.name,
                    price: room?.price,
                    totalRooms: room?.totalRooms,
                    seasonalPriceListView: Array.from({length: 31}).map((_, idx) => {
                        
                        return {

                        }
                    })
                }
            })

            let tes, tesfind
            propertyRoomType.forEach((item, index) => {
                 tesfind = item.seasonalPrice.find(season => season.date === new Date(2024, 11, 28))
                 tes = item.seasonalPrice.findIndex(season => season.date === new Date(2024, 11, 28))
                if(tes > -1) {
                    console.log('>>>>:', tes)
                    console.log('tesFind:', tesfind)
                }
            })
            res.status(200).json({
                message: 'Successfully fetch room type by property',
                error: false,
                data: {
                    propertyRoomType,
                    isIncludeBreakfast,
                    totalPage,
                    pageInUse,
                    tes,
                    tesfind
                }
            })
    
        } catch (error) {
            next(error)
        }
}