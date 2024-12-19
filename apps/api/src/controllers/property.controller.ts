import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

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

        const propertyFacilities = await prisma.propertyHasFacility.findMany({
            where: {
                propertyId: property?.id
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
                }
            },
            take: 10
        })

        const tenant = await prisma.tenant.findUnique({
            where: {
                id: property?.tenantId as string
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
                tenant
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