import { prisma } from "@/connection"; 
import { ISearch } from './types'

export const createSearchService = async({country, city , checkInDate, checkOutDate, adult, children}: ISearch) => {

    const totalGuests = adult + children;
    
    let whereCondition;

    if(city) {
        whereCondition = [
            {
                cityId: city
            },
            {
                countryId: country
            },
            {
                deletedAt: null
            }
        ]    
    } else {
        whereCondition = [
            {
                countryId: country
            },
            {
                deletedAt: null
            }
        ]
    }

    const getProperty = await prisma.property.findMany({
        where: {
            AND: whereCondition
        },
        select: {
            id: true,
            name: true,
            city: {
                select: {
                    name: true,
                }
            },
            country: {
                select: {
                    name: true
                }
            },
            propertyDetail: {
                select: {
                    propertyImage: {
                        select: {
                            directory: true,
                            fileExtension: true,
                            filename: true
                        }
                    }
                }
            },
            propertyRoomType: {
                where: {
                    AND: [
                        {
                            capacity: {
                                gte: totalGuests,
                                lte: totalGuests + 1
                            }
                        },
                        {
                            transaction: {
                                none: {
                                    AND: [
                                        {
                                            checkInDate: { lte: checkInDate },
                                            checkOutDate: { gte: checkOutDate }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }, 
                orderBy: {
                    price: 'asc'
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    totalRooms: true,
                    capacity: true,
                    propertyRoomImage: {
                        select: {
                            id: true,
                            directory: true,
                            filename:true,
                        }
                    },
                    transaction: {
                        where: {
                            checkInDate: {
                                lte: checkOutDate,
                            },
                            checkOutDate: {
                                gte: checkInDate,
                            },
                        },
                    }
                },

            }
        }
    });

    // console.log("Input Parameters:", {
    //     country, city, checkInDate, checkOutDate, adult, children
    // });

    // console.log("property", getProperty)

    return getProperty.filter((item) => item.propertyRoomType.length > 0).map((item) => ({
        ...item,
        propertyRoomType: item.propertyRoomType
            .filter(roomType => 
                roomType.capacity >= totalGuests && roomType.capacity <= totalGuests + 1
            )
            .map((roomType) => {
                const bookedRooms = roomType.transaction.length;
                const availableRooms = roomType.totalRooms - bookedRooms;
    
                return {
                    ...roomType,
                    availableRooms,
                }
            })
    }));
}

