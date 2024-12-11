import { prisma } from "@/connection"; 
import { ISearch } from './types'

export const createSearchService = async({inputPropertyType, country, city , checkInDate, checkOutDate, adult, children}: ISearch) => {

    const totalGuests = adult + children;

    let countriesId: number[] | null = null;



    // if(city){
    //     const cityData = await prisma.city.findMany({
    //         where: { name: { contains: city, mode: 'insensitive'}},
    //         select: { countryId: true }
    //     });
    //     countriesId = cityData.map(item => item.countryId)
    // }

    // if(!country && countriesId && countriesId.length > 0){
    //     country = null;
    // }

    const countryIdCondition = countriesId ? { in: countriesId }: undefined;
    
    let whereCondition;
    if(city) {
        whereCondition = [
            {
                cityId: country
            },
            {
                countryId: country
            },
            {
                propertyType: {
                    name: {
                        contains: inputPropertyType
                    }
                }
            }
        ]
    } else {
        whereCondition = [
            {
                countryId: country
            },
            {
                propertyType: {
                    name: {
                        contains: inputPropertyType
                    }
                }
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
                    capacity: {
                        gte: totalGuests,
                    },
                    AND: [
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

    return getProperty.map((item) => ({
        ...item,
        propertyRoomType: item.propertyRoomType.map((item) => {
            const bookedRooms = item.transaction.length;
            const availableRooms = item.totalRooms - bookedRooms;

            const isAvailable = availableRooms > 0;

            return {
                ...item,
                isAvailable,
                availableRooms,
            }
        })
    }))

}

// [
//     {
//         // OR: [ 
//         //     {
//         //         country: {
//         //             name: {
//         //                 contains: country || "",
//         //                 mode: 'insensitive'
//         //             }
//         //         }
//         //     },
//         //     {
//         //         city: {
//         //             name: {
//         //                 contains: city || "",
//         //                 mode: 'insensitive'
//         //             },
//         //         }
//         //     }
//         // ]
    
//     },
//     {
//         countryId: country
//     },
//     {
//         propertyType: {
//             name: {
//                 contains: inputPropertyType
//             }
//             // some: {
//             //     name: {
//             //         contains: book || "",
//             //         mode: 'insensitive'
//             //     }
//             // }
//         }
//     }
// ]