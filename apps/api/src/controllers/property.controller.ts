import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { getRoomTypeService } from '@/services/property.service'

export const createProperty = async(req: Request, res: Response, next: NextFunction) => {
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
            propertyTypeId,
            propertyFacilitiesId,
            propertyFacilitiesName,
            propertyImages, //arr of obj
            propertyDescription,
            neighborhoodDescription, //nilai jual lingkungan
            phoneNumber,
            url, //property website
            totalRooms, //total room in this property
            propertyRoomNames, //arr
            propertyRoomDescriptions, //arr
            propertyRoomCapacities, //arr
            propertyRoomBathrooms, //arr
            propertyRoomPrices, //arr
            propertyRoomTotalRooms, //arr
            propertyRoomImages, //arr of obj
    
        } = req.body
        
        const uuid = uuidV4()
        const propertyId = uuid
        const slug = name.toLowerCase().split(' ').join('-')


        let createdCity, createdCountry
    
        const isCountryExist = await prisma.city.findFirst({
            where: {
                name: {
                    contains: countryName,
                    mode: 'insensitive'
                }
            }
        })
    
        if(!isCountryExist?.id) {
            createdCountry = await prisma.country.create({
                data: {
                    name: countryName,
                    directory: '',
                    filename: '',
                    fileExtension: '',
                    description: ''
                }
            })
        }
        
        const isCityExist = await prisma.city.findFirst({
            where: {
                name: {
                    contains: cityName,
                    mode: 'insensitive'
                }
            }
        })
    
        if(!isCityExist?.id) {
            createdCity = await prisma.city.create({
                data: {
                    name: cityName,
                    directory: '',
                    filename: '',
                    fileExtension: '',
                    countryId: (countryId as number || createdCountry?.id as number)
                }
            })
        }
    
        const createdProperty = await prisma.property.create({
            data: {
                id: propertyId,
                name,
                countryId: (countryId as number || createdCountry?.id as number),
                cityId: (cityId as number || createdCity?.id as number),
                tenantId: id,
                propertyTypeId,
                checkInStartTime,
                checkInEndTime,
                checkOutStartTime,
                checkOutEndTime,
                slug,
                location,
                zipCode,
                address
            }
        })

        const createdPropertyHasFacilities = await prisma.propertyHasFacility.createMany({
            data: propertyFacilitiesId.map((item: number) => {
                return {
                    propertyId,
                    propertyFacilityId: item
                }
            })
        })

        //kalo facility ga ada harus create facilitynya

        // const createdPropertyRooms = await prisma.propertyRoomType.createMany({
            
        // }) buat room
        // const createdPropertyRooms = await prisma.roomHasFacilities.createMany({
            
        // }) buat fasilitas kamar
    } catch (error) {
        
    }

    //jika punya facility children maka boleh tambah children
}

export const getPropertyDetail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params
        const { checkInDate, checkOutDate, adult, children } = req.query
    
        const property = await prisma.property.findFirst({
            where: {
                slug: slug as string
            },
            include: {
                propertyDetail: true,
                propertyRoomType: true
            },
        })
    
        if(!property?.id) throw { msg: 'Property not found!', status: 406 }

        const propertyHasFacilities = await prisma.propertyHasFacility.findMany({
            where: {
                propertyId: property?.id
            }
        })

        const propertyFacilities = await prisma.propertyFacility.findMany({
            where: {
                id: {
                    in: propertyHasFacilities.map(item => item.propertyFacilityId)
                }
            }
        })

        const propertyImages = await prisma.propertyImage.findMany({
            where: {
                propertyDetailId: property.propertyDetail?.id
            }
        })

        const propertyRoomImages = await prisma.propertyRoomImage.findMany({
            where: {
                propertyRoomTypeId: {
                    in: property.propertyRoomType.map(item => item.id)
                }
            }
        }) 

        const propertyRoomType = await prisma.propertyRoomType.findMany({
            where: {
                propertyId: property?.id
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
            }
        })

        const reviews = await prisma.review.findMany({
            where: {
                propertyId: property.id
            }
        })

        const city = await prisma.city.findUnique({
            where: {
                id: property?.cityId as number
            }
        })

        const country = await prisma.city.findUnique({
            where: {
                id: property?.countryId as number
            }
        })

        const propertyListByCity = await prisma.property.findMany({
            where: {
                cityId: property?.cityId,
                id: {
                    not: property?.id
                }
            },
            include: {
                country: true,
                city: true,
                review: true,
                propertyDetail: {
                    include: {
                        propertyImage: true
                    }
                },
                propertyRoomType: {
                    orderBy: {
                        price: 'asc'
                    }
                }
            },
            take: 10
        })

        const tenant = await prisma.tenant.findUnique({
            where: {
                id: property?.tenantId as string
            }
        })

        const generalFacilities = await prisma.roomHasFacilities.findMany({
            where: {
                propertyRoomFacility : {
                    
                }
            }

        })

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

        res.status(200).json({
            error: false,
            message: 'Get property detail success',
            data: {
                property,
                propertyDetail: property.propertyDetail,
                propertyFacilities,
                propertyImages: [...propertyImages, ...propertyRoomImages],
                propertyImagesPreview: [...propertyImages, ...propertyRoomImages].slice(0,8),
                propertyRoomType,
                reviews,
                city,
                country,
                propertyListByCity,
                tenant,
                isIncludeBreakfast
            }
        })
    } catch (error) {
        next(error)
    }


}

export const getPropertyRoomTypeByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyId } = req.params
        const { limit = 2, offset = 0 } = req.query

        const propertyRoomType = await prisma.propertyRoomType.findMany({
            where: {
                propertyId
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
            take: Number(limit),
            skip: Number(offset)
        })

        const getAllRooms = await prisma.propertyRoomType.findMany({
            where: {
                propertyId
            }
        })

        const totalPage = Math.ceil(getAllRooms.length / Number(limit))

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

        res.status(200).json({
            message: 'Successfully fetch room type by property',
            error: false,
            data: {
                propertyRoomType,
                isIncludeBreakfast,
                totalPage,
                pageInUse
            }
        })

    } catch (error) {
        next(error)
    }
}

export const dataForFilteringProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyType = await prisma.propertyType.findMany({
            include: {
                _count: {
                    select: {
                        property: true
                    }
                }
            }
        })

        const propertyFacility = await prisma.propertyFacility.findMany({
            include: {
                _count: {
                    select: {
                        propertyHasFacility: true
                    }
                }
            }
        })

        const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
            include: {
                _count: {
                    select: {
                        roomHasFacilities: true
                    }
                }
            }
        })

        res.status(200).json({
            error: false,
            message: 'Get data for filtering property success',
            data: {
                propertyType,
                propertyFacility,
                propertyRoomFacility
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getProperties = async(req: Request, res: Response, next: NextFunction) => {
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
            sortPrice = 'asc',
            sortName = 'asc',
            ratings 
        } = req.query

        const { 
            propertytypeidarr = '', 
            propertyfacilityidarr = '', 
            propertyroomfacilityidarr = '', 
        } = req.headers

        let numberedPropertyFacilityIdArr, numberedPropertyRoomFacilityIdArr, numberedPropertyTypeIdArr
        let propertyFacilityFromPrisma, propertyRoomFacilityFromPrisma

        if(propertyfacilityidarr) {
            const propertyFacilityIdStr = propertyfacilityidarr as string
            numberedPropertyFacilityIdArr = propertyFacilityIdStr.split(',')
            numberedPropertyFacilityIdArr = numberedPropertyFacilityIdArr.map(item => Number(item))
            propertyFacilityFromPrisma = await prisma.propertyFacility.findMany({
                where: {
                    id: {
                        notIn: numberedPropertyFacilityIdArr
                    }
                },
                select: {
                    id: true
                }
            })
        }
        if(propertyroomfacilityidarr) {
            const propertyRoomFacilityIdStr = propertyroomfacilityidarr as string
            numberedPropertyRoomFacilityIdArr = propertyRoomFacilityIdStr.split(',')
            numberedPropertyRoomFacilityIdArr = numberedPropertyRoomFacilityIdArr.map(item => Number(item))
            propertyRoomFacilityFromPrisma = await prisma.propertyRoomFacility.findMany({
                where: {
                    id: {
                        notIn: numberedPropertyRoomFacilityIdArr
                    }
                },
                select: {
                    id: true
                }
            })
        }
        if(propertytypeidarr) {
            const propertyTypeIdStr = propertytypeidarr as string
            numberedPropertyTypeIdArr = propertyTypeIdStr.split(',')
            numberedPropertyTypeIdArr = numberedPropertyTypeIdArr.map(item => Number(item))
        }

        const city = await prisma.city.findUnique({
            where: {
                id: Number(cityId)
            }
        })

        const country = await prisma.country.findUnique({
            where: {
                id: Number(countryId)
            }
        })
        if(cityId && countryId) {
        } else if(countryId) {
        }
        const whereConditionPropertyRoomFacility = propertyroomfacilityidarr && numberedPropertyRoomFacilityIdArr && numberedPropertyRoomFacilityIdArr.length > 0 ? 
        numberedPropertyRoomFacilityIdArr.map(item => ({
            propertyRoomType: {
                some: {
                    roomHasFacilities: {
                        some: {
                            propertyRoomFacilityId: item
                        }
                    }
                }
            }
        }))
        : []

        const whereConditionPropertyFacility = propertyfacilityidarr && numberedPropertyFacilityIdArr && numberedPropertyFacilityIdArr.length > 0 ? 
        numberedPropertyFacilityIdArr.map(item => ({
            propertyHasFacility : {
                some : {
                    propertyFacilityId: item
                }
            },
        }))
        : []

        const whereCondition = [
            countryId ? {
                countryId: Number(countryId),
            } : {},
            cityId ? {
                cityId: Number(cityId),
            } : {},
            minPrice && maxPrice ? {
                propertyRoomType: {
                    some: {
                        price: {
                            gte: Number(minPrice),
                            lte: Number(maxPrice)
                        },
                    }
                }
            } : {},
            (adult && !isNaN(Number(adult))) ? {
                propertyRoomType: {
                    some: {
                        capacity: {
                            gte: Number(children) + Number(adult),
                            lte: Number(children) + Number(adult) + 2,
                        },
                    }
                }
            } : {},
            // propertyroomfacilityidarr && numberedPropertyRoomFacilityIdArr && numberedPropertyRoomFacilityIdArr.length > 0 ? 
            //     numberedPropertyRoomFacilityIdArr.map(item => ({
            //         propertyRoomType: {
            //             some: {
            //                 roomHasFacilities: {
            //                     some: {
            //                         propertyRoomFacilityId: {
            //                             in: propertyRoomFacilityFromPrisma?.map(item => item.id)
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }))
            //  : {},
            propertytypeidarr && numberedPropertyTypeIdArr && numberedPropertyTypeIdArr.length > 0 ? {
                propertyType: {
                    id: {
                        in: numberedPropertyTypeIdArr
                    }
                },
            } : {},
            // propertyfacilityidarr && numberedPropertyFacilityIdArr && numberedPropertyFacilityIdArr.length > 0 ? {
            //     propertyHasFacility : {
            //         every : {
            //             propertyFacilityId: {
            //                 in: propertyFacilityFromPrisma?.map(item => item.id)
            //             }
            //         }
            //     },
            // }: {}
        ].filter(item => Object.keys(item).length)

        const countProperties = await prisma.property.count({
            where: {
                AND: [...whereCondition, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility]
            }
        })

        const properties = await prisma.property.findMany({
            take: Number(limit),
            skip: Number(offset),
            where: {
                AND: [...whereCondition, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility],
            },
            include: {
                propertyRoomType: {
                    orderBy: {
                        price: 'asc'
                    }
                },
                propertyType: true,
                propertyHasFacility: {
                    include : {
                        propertyFacility: true
                    }
                },
                city: true,
                country: true,
                propertyDetail: {
                    include: {
                        propertyImage: true
                    }
                },
                review: true
                
            }
        })

        const propertyAvgRating = await prisma.review.aggregate({
            _avg: {
                rating: true
            },
            where: {
                propertyId: {
                    in: properties.map(item => item.id)
                }
            }
        })

        const propertyType = await prisma.propertyType.findMany({
            where: {
                id: {
                    in: properties.map(item => item.propertyTypeId) as number[]
                }
            }
        })

        const propertyTypeCounter = await prisma.propertyType.count({
            where: {
                id: {
                    in: properties.map(item => item.propertyTypeId) as number[] 
                }
            }
        })

        const propertyFacility = await prisma.propertyFacility.findMany({
            where: {
                propertyHasFacility: {
                    some: {
                        propertyId: {
                            in: properties.map(item => item.id)
                        }
                    }
                }
            }
        })

        const propertyFacilityCounter = await prisma.propertyFacility.count({
            where: {
                propertyHasFacility: {
                    some: {
                        propertyId: {
                            in: properties.map(item => item.id)
                        }
                    }
                }
            }
        })

        const propertyRoomTypeId = properties.map(item => item.propertyRoomType.map(itm => itm.id)).flat()

        const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
            where: {
                roomHasFacilities: {
                    some: {
                        propertyRoomTypeId: {
                            in: propertyRoomTypeId
                        }
                    }
                }
            }
        })

        const propertyRoomFacilityCounter = await prisma.propertyRoomFacility.count({
            where: {
                roomHasFacilities: {
                    some: {
                        propertyRoomTypeId: {
                            in: propertyRoomTypeId
                        }
                    }
                }
            }
        })

        res.status(200).json({
            error: false,
            message: 'Get properties success',
            data: {
                headers: req.headers,
                numberedPropertyFacilityIdArr,
                countProperties,
                properties,
                propertyAvgRating,
                totalPage: Math.ceil(countProperties / Number(limit)),
                pageInUse: Number(offset)/Number(limit) + 1, 
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
                city
            }
        })

    } catch (error) {
        next(error)
    }
}
/*
model PropertyRoomType {
  id         Int    @id @default(autoincrement())
  name       String
  description String
  rooms      Int?
  capacity   Int
  bathrooms  Int
  price      Int
  totalRooms Int
*/



// name              String
//   address           String
//   zipCode           String
//   location          String
//   checkInStartTime  DateTime
//   checkInEndTime    DateTime
//   checkOutStartTime DateTime
//   checkOutEndTime   DateTime
//   slug              String   @unique
  

//   propertyTypeId Int?
//   propertyType   PropertyType? @relation(fields: [propertyTypeId], references: [id])

//   tenantId String?
//   tenant   Tenant? @relation(fields: [tenantId], references: [id])

//   countryId Int?
//   country   Country? @relation(fields: [countryId], references: [id])

//   cityId Int?
//   city 

export const getRoomType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomTypeId } = req.params


        const result = await getRoomTypeService(Number(propertyRoomTypeId))

        res.status(200).json({
            message: 'Succesfully fetch Room Type',
            error: false,
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}