import { prisma } from "@/connection"; 
import { ISearch } from './types'

export const createSearchService = async({propertyTypeId, country, city , checkInDate, checkOutDate, adult, children}: ISearch) => {

    console.log(propertyTypeId)
    console.log(country)
    console.log(city)
    console.log(checkInDate)
    console.log(checkOutDate)
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
                propertyTypeId
            }
        ]    
    } else {
        whereCondition = [
            {
                countryId: country
            },
            {
                propertyTypeId
            }
        ]
    }
    

    const getProperty = await prisma.property.findMany({
        where: {
            AND : whereCondition
        },

        select: {
            name: true,
            city: {
                select: {
                    name: true,
                },
            },
            country: {
                select: {
                    name: true
                },
            },
            propertyRoomType: {
                where: {
                    AND: [
                        {
                            capacity: {
                                gte: totalGuests,
                                lte: totalGuests + 1
                            },
                        },
                        {
                            transaction: {
                                none: {
                                    OR: [
                                        {
                                            checkInDate: {
                                                lte: checkInDate,
                                            },
                                            checkOutDate: {
                                                gte: checkOutDate
                                            }
                                        },
                                    ],
                                },
                            },
                        },
                    ],
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
                }
            },
            
        }
    });

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
