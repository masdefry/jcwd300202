import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { getRoomTypeService } from '@/services/property.service'
import { deleteFiles } from "@/utils/deleteFiles";
import { addDays, differenceInDays } from "date-fns";

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
            countPropertyImages,
            propertyTypeId,
            propertyFacilitiesId,
            propertyFacilitiesName,
            propertyImages, //arr of obj
            propertyDescription,
            neighborhoodDescription, //nilai jual lingkungan
            phoneNumber,
            url, //property website
            totalRooms, //total room in this property
            propertyRoomTypes,
            propertyRoomNames, //arr
            propertyRoomDescriptions, //arr
            propertyRoomCapacities, //arr
            propertyRoomBathrooms, //arr
            propertyRoomPrices, //arr
            propertyRoomTotalRooms, //arr
            propertyRoomImages, //arr of obj
        } = req.body
        
        console.log(req.body)

        if(Array.isArray(req.files)) throw { msg: 'Images not found!', status: 406 }
        const imagesUploaded: any = req?.files?.images

        const uuid = uuidV4()
        const propertyId = uuid
        const slug = `${name.toLowerCase().split(' ').join('-')}-${propertyId}`


        let createdProperty: any, createdPropertyHasFacilities, createdPropertyDetail: any, createdPropertyRoomTypes: any, createdRoomHasFacilities
        await prisma.$transaction(async(tx) => {
        
        createdProperty = await tx.property.create({
            data: {
                id: propertyId,
                name,
                countryId: (Number(countryId)),
                cityId: (Number(cityId)),
                tenantId: id,
                propertyTypeId: Number(propertyTypeId),
                checkInStartTime: new Date(new Date().toISOString().split('T')[0] + 'T' + checkInStartTime + ':00') ,
                checkInEndTime: checkInEndTime ? new Date(new Date().toISOString().split('T')[0] + 'T' + checkInEndTime + ':00') : null,
                checkOutStartTime: checkOutStartTime ? new Date(new Date().toISOString().split('T')[0] + 'T' + checkOutStartTime + ':00') : null,
                checkOutEndTime: new Date(new Date().toISOString().split('T')[0] + 'T' + checkOutEndTime + ':00') ,
                slug,
                location,
                zipCode,
                address,
            }
        })

        createdPropertyHasFacilities = await tx.propertyHasFacility.createMany({
            data: JSON.parse(propertyFacilitiesId).map((item: { id: string | number }) => {
                return {
                    propertyId,
                    propertyFacilityId: Number(item?.id)
                }
            })
        })

        createdPropertyDetail = await tx.propertyDetail.create({
            data: {
                propertyId: createdProperty?.id,
                propertyDescription,
                neighborhoodDescription,
                phoneNumber,
                url,
                totalRooms: Number(totalRooms),
            }
        })

        const copiedImagesUploaded = [...imagesUploaded]
        const imagesForProperty: any = []
        for(let i = 0; i < countPropertyImages; i++) {
            imagesForProperty.push({
                propertyDetailId: createdPropertyDetail?.id,
                filename: copiedImagesUploaded[i]?.filename.split('.')[0],
                fileExtension: copiedImagesUploaded[i]?.filename.split('.')[1],
                directory: copiedImagesUploaded[i]?.destination
            })
        }
        copiedImagesUploaded.splice(0, countPropertyImages)
        
        createdPropertyRoomTypes = await tx.propertyRoomType.createManyAndReturn({
            data: JSON.parse(propertyRoomTypes).map((item: any) => {
                return {
                    propertyId: createdProperty?.id,
                    name: item?.name,        
                    description: item?.description, 
                    rooms: item?.rooms,    
                    capacity: item?.capacity,    
                    bathrooms: item?.bathrooms,   
                    price: item?.price, 
                    totalRooms: item?.totalRooms 
                }
            })
        })
        
        createdRoomHasFacilities = await tx.roomHasFacilities.createMany({
            data: JSON.parse(propertyRoomTypes).map((item: any, index: number) => {
                const roomFacilities = item?.roomFacilities.map((itm: any) => {
                    return {
                        propertyRoomTypeId: createdPropertyRoomTypes[index].id,
                        propertyRoomFacilityId: itm
                    }
                })
                return roomFacilities
            }).flat() 
        })

        // const findCreatedPropertyDetailId = await prisma.propertyDetail.findUnique({
        //     where: {
        //         id: createdPropertyDetail?.id
        //     },
        //     select: {
        //         id: true
        //     }
        // })

        console.log('imagesForProperty')
        console.log(imagesForProperty)
        const createdPropertyImages = await prisma.propertyImage.createMany({
            data: imagesForProperty
        })
        const imagesForRooms: any = []
        JSON.parse(propertyRoomTypes).forEach((item: any, index: number) => {
            for(let i = 0; i < item?.countRoomImage; i++) {
                imagesForRooms.push({
                    propertyRoomTypeId: createdPropertyRoomTypes[index].id,
                    filename: copiedImagesUploaded[i].filename.split('.')[0],
                    fileExtension: copiedImagesUploaded[i].filename.split('.')[1],
                    directory: copiedImagesUploaded[i].destination
                })
            }
            copiedImagesUploaded.splice(0, item?.countRoomImage)
        })
       
        const createdRoomImages = await prisma.propertyRoomImage.createMany({
            data: imagesForRooms
        })

        }, {
            timeout: 50000
        })

        res.status(201).json({
            error: false,
            message: 'Create property success',
            data: {
                tes: req.files,
                tes2: req.body,
                // createdProperty,
                // createdRoomHasFacilities,
                // createdPropertyDetail,
                // createdPropertyRoomTypes,
                // createdPropertyHasFacilities,
            }
        })
    } catch (error) {
        console.log(error)
        deleteFiles({imagesUploaded: req.files})
        next(error)
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
        
        const seasonalPrice = await prisma.seasonalPrice.findMany({
            where: {
                propertyId: property?.id,
                date: {
                    gte: checkInDate ? new Date(checkInDate as string).toISOString() : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString(),
                    lt: checkOutDate ? new Date(checkOutDate as string).toISOString() : addDays(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 1).toISOString(),
                }
            }
        })

        const propertyRoomTypeWithSeasonalPrice = propertyRoomType.map((item, index) => {
            let totalPrice = 0
            const seasonalPriceByPropertyRoomTypeLength = seasonalPrice.filter(itm => itm?.propertyRoomTypeId === item?.id).length
            let seasonalPriceByPropertyRoomType = 0
            if(seasonalPriceByPropertyRoomTypeLength > 0) {
                seasonalPriceByPropertyRoomType = seasonalPrice.filter(itm => itm?.propertyRoomTypeId === item?.id).map(itm => itm.price).reduce((acc, curr) => acc + curr)
            }
            let totalDays = 1
            if(checkInDate && checkOutDate) {
                totalDays = Math.abs(differenceInDays(checkInDate as string, checkOutDate as string))
            }
            totalPrice = ((totalDays - seasonalPriceByPropertyRoomTypeLength) * item.price) + seasonalPriceByPropertyRoomType
            return {
                ...item, totalPrice, totalDays, seasonalPriceByPropertyRoomType
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
                isIncludeBreakfast,
                seasonalPrice
            }
        })
    } catch (error) {
        console.log(error)
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
            sortBy = 'price',
            order = 'asc',
            ratings 
        } = req.query

        const { 
            propertytypeidarr = '', 
            propertyfacilityidarr = '', 
            propertyroomfacilityidarr = '', 
        } = req.headers

        let numberedPropertyFacilityIdArr, numberedPropertyRoomFacilityIdArr, numberedPropertyTypeIdArr
        let propertyFacilityFromPrisma, propertyRoomFacilityFromPrisma
        let city, country
        if(!sortBy) throw { msg: 'Sort parameter not found!', status: 406 }
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

        // cityId && (
        //     city = await prisma.city.findUnique({
        //         where: {
        //             id: Number(cityId)
        //         }
        //     })
        // ) 
        
        // countryId && (
        //     country = await prisma.country.findUnique({
        //         where: {
        //             id: Number(countryId)
        //         }
        //     })
        // )
        
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

        // const whereConditionLocation = [
            
        // ].filter(item => Object.keys(item).length)

        const whereConditionGeneral: any = [
            (countryId && !isNaN(Number(countryId)))? {
                countryId: Number(countryId),
            } : null,
            (cityId && !isNaN(Number(cityId))) ? {
                cityId: Number(cityId),
            } : null,
            (minPrice && !isNaN(Number(minPrice))) && (maxPrice && !isNaN(Number(maxPrice))) ? {
                propertyRoomType: {
                    some: {
                        price: {
                            gte: Number(minPrice),
                            lte: Number(maxPrice)
                        },
                    }
                }
            } : null,
            (adult && !isNaN(Number(adult))) ? {
                propertyRoomType: {
                    some: {
                        capacity: {
                            gte: Number(children) + Number(adult),
                            lte: Number(children) + Number(adult) + 2,
                        },
                    }
                }
            } : null,
            propertytypeidarr && numberedPropertyTypeIdArr && numberedPropertyTypeIdArr.length > 0 ? {
                propertyType: {
                    id: {
                        in: numberedPropertyTypeIdArr
                    }
                },
            } : null,
        ].filter(Boolean).filter(item => item?.countryId !== null).filter(item => item?.cityId !== null)
        
        console.log(Number(countryId))
        
        const whereCondition = [...whereConditionGeneral, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility].length > 0 ? {
            AND: [...whereConditionGeneral, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility].filter(Boolean)
        } : {}
        let properties, propertiesWithoutLimit, sortedProperties, sortedPropertiesId
        
        if(( countryId && checkInDate && checkOutDate ) || propertytypeidarr || propertyfacilityidarr || propertyroomfacilityidarr) {
            propertiesWithoutLimit = await prisma.property.findMany({
                // where: {
                //     AND: [...whereConditionGeneral, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility].filter(Boolean),
                //     OR: [
                //         cityId: Number(cityId)
                //     ]
                // },
                where: whereCondition,
                include: {
                    propertyRoomType : true
                }
            })
            if( sortBy === 'name' ) {
                sortedProperties = await prisma.property.findMany({
                    where: {
                        id: {
                            in: propertiesWithoutLimit.map(item => item?.id)
                        }
                    },
                    select: {
                        id: true
                    },
                    orderBy: {
                        name: order === 'desc' ? 'desc' : 'asc'
                    },
                    take: Number(limit),
                    skip: Number(offset)
                })
                sortedPropertiesId = sortedProperties?.map(item => item.id)
            } else {
                const getPropertiesId = await prisma.property.findMany({
                    where: {
                        id: {
                            in: propertiesWithoutLimit.map(item => item?.id)
                        }
                    },
                    select: {
                        id: true
                    }
                })
                sortedProperties = await prisma.propertyRoomType.groupBy({
                    where: {
                        propertyId: {
                            in: getPropertiesId.map(item => item?.id)
                        }
                    },
                    by: ['propertyId'],
                    orderBy: {
                        _min: {
                            price: order === 'desc' ? 'desc' : 'asc'
                        },
                    },
                    take: Number(limit),
                    skip: Number(offset)
                })
                sortedPropertiesId = sortedProperties?.map(item => item.propertyId)
            }
            
            properties = await prisma.property.findMany({
                where: {
                    // AND: [...whereCondition, ...whereConditionPropertyFacility, ...whereConditionPropertyRoomFacility],
                    id: {
                        in: sortedPropertiesId
                    }
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
                    review: true,
                    
                },
                orderBy: {
                    name: order === 'desc' ? 'desc' : 'asc'
                }
            })
        } else {
            propertiesWithoutLimit = await prisma.property.findMany({
                include: {
                    propertyRoomType: true
                }
            })
            if( sortBy === 'name' ) {
                sortedProperties = await prisma.property.findMany({
                    select: {
                        id: true
                    },
                    orderBy: {
                        name: order === 'desc' ? 'desc' : 'asc'
                    },
                    take: Number(limit),
                    skip: Number(offset)
                })
                sortedPropertiesId = sortedProperties?.map(item => item.id)
            } else {
                sortedProperties = await prisma.propertyRoomType.groupBy({
                    by: ['propertyId'],
                    orderBy: {
                        _min: {
                            price: order === 'desc' ? 'desc' : 'asc'
                        },
                    },
                    take: Number(limit),
                    skip: Number(offset)
                })
                sortedPropertiesId = sortedProperties?.map(item => item.propertyId)
            }
            
            properties = await prisma.property.findMany({
                where: {
                    id: {
                        in: sortedPropertiesId
                    }
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
                    
                },
                orderBy: {
                    name: order === 'desc' ? 'desc' : 'asc'
                }
            })
        }
        
        if(sortBy !== 'price') {
        } else {
            if(order === 'desc') {
                properties = properties.sort((a,b) => b.propertyRoomType[0].price - a.propertyRoomType[0].price)
            } else {
                properties = properties.sort((a,b) => a.propertyRoomType[0].price - b.propertyRoomType[0].price)
            }
        }


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
                    in: propertiesWithoutLimit.map(item => item.propertyTypeId) as number[]
                }
            }
        })

        const propertyTypeCounter = await prisma.propertyType.count({
            where: {
                id: {
                    in: propertiesWithoutLimit.map(item => item.propertyTypeId) as number[] 
                }
            }
        })

        const propertyFacility = await prisma.propertyFacility.findMany({
            where: {
                propertyHasFacility: {
                    some: {
                        propertyId: {
                            in: propertiesWithoutLimit.map(item => item.id)
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
                            in: propertiesWithoutLimit.map(item => item.id)
                        }
                    }
                }
            }
        })

        const propertyRoomTypeId = propertiesWithoutLimit.map(item => item.propertyRoomType.map(itm => itm.id)).flat()

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
        console.log(whereConditionGeneral)
        console.log('>>>')
        console.log('countryId',countryId)
        console.log(req.query)
        res.status(200).json({
            error: false,
            message: 'Get properties success',
            data: {
                whereConditionGeneral,
                numberedPropertyFacilityIdArr,
                countProperties: propertiesWithoutLimit.length,
                properties,
                propertyAvgRating,
                totalPage: Math.ceil(propertiesWithoutLimit.length / Number(limit)),
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
                city,
                countryId,
                cityId
            }
        })

    } catch (error: any) {
        // res.status(500).json({
        //     error: true,
        //     message: error.message
        // })
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