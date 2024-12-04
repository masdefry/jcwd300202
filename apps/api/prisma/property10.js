const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property10 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Heaven Villa Ubud',
            country: 'Indonesia',
            address: 'Jl. Raya Sanggingan, Banjar Lungsiakan, Kedewatan, Ubud, Gianyar Regency, Indonesia',
            zip_code: '80571',
            city: 'Gianyar Regency',
            location: '-8.4847646,115.2511835',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                The accommodation is air conditioned and has a flat-screen TV Some units have a seating area and/or balcony. 
                There is also a kitchen, equipped with an oven and microwave. 
                A fridge and stovetop are also featured, as well as a kettle. Bed linen is available.
            `,
            neighborhood_description: `
                The property has water sports facilities and bike hire and car hire are available. 
                You can engage in various activities, such as horse riding, windsurfing and diving. 
                Ubud Monkey Forest is 3.7 km from Heaven Villa Ubud, while Elephant Cave is 6 km away. 
                The nearest airport is Ngurah Rai International Airport, 30 km from the property.
            `,
            phone_number: '+62-595-213-444',
            url: 'https://www.ubudheaven.com/',
            total_room: 4,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Naturity',
            rooms: 4,
            capacity: 8,
            bathrooms: 4,
            price: 2800000,
            total_rooms: 1,
            propertyId: 10
        },
        {
            name: 'Elegant',
            rooms: 4,
            capacity: 8,
            bathrooms: 4,
            price: 2700000,
            total_rooms: 1,
            propertyId: 10
        },
        {
            name: 'Village',
            rooms: 3,
            capacity: 6,
            bathrooms: 3,
            price: 1900000,
            total_rooms: 2,
            propertyId: 10
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 10,
            filename: `property_10_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 28,
            filename: `property_10_room_28_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 29,
            filename: `property_10_room_29_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 30,
            filename: `property_10_room_30_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property10HasFacility = [4, 5, 6, 7, 8, 9, 12, 13, 18]
    property10HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 10,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 28,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 29,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 30,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    
    async function main() {
    
        for(let i=0; i < property.length; i++){
            const tenant = tenantAccounts[i % tenantAccounts.length]
            const properties = property[i]
    
            await prisma.property.create({
                data: {
                    name: properties.name,
                    country: properties.country,
                    address: properties.address,
                    zip_code: properties.zip_code,
                    city: properties.city,
                    location: properties.location,
                    checkInStartTime: properties.checkInStartTime,
                    checkInEndTime: properties.checkInEndTime,
                    checkOutStartTime: properties.checkOutStartTime,
                    checkOutEndTime: properties.checkOutEndTime,
                    propertyTypeId: 3,
                    tenantId: tenant.id 
                }
            })
        }
    
        await prisma.propertyDetail.create({
            data: {
                property_description: propertyDetail[0].property_description,
                neighborhood_description: propertyDetail[0].neighborhood_description,
                phone_number: propertyDetail[0].phone_number,
                url: propertyDetail[0].url,
                total_room: propertyDetail[0].total_room,
                propertyId: 10
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
        })
        
        await prisma.roomHasFacilities.createMany({
            data: roomHasFacility
        })
        
        await prisma.propertyHasFacility.createMany({
            data: propertyHasFacility
        })
        
        await prisma.propertyImage.createMany({
            data: propertyImages
        })
    
        await prisma.propertyRoomImage.createMany({
            data: propertyRoomImages
        })
    
    }
    
    main()
      .catch((e) => {
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
}

module.exports = { Property10 }