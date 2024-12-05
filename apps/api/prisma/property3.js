const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property3 ({tenantAccounts}) {
    const property = [
        {
            name: 'Green Haven Apartments',
            country: 'Indonesia',
            address: 'Jl. Senopati No.45, Kebayoran Baru, South Jakarta, Special Capital Region of Jakarta',
            zip_code: '12190',
            city: 'Jakarta',
            location: '-6.236845, 106.807230',
            checkInStartTime: new Date('2024-12-03T14:00:00Z'),
            checkInEndTime: new Date('2024-12-03T21:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T07:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T11:00:00Z'),
        }
    ]

    const propertyDetail = [
        {
            property_description: `
                Nestled in the heart of South Jakarta, Green Haven Apartments offers a modern and cozy living experience. Just a short stroll from the vibrant Senopati area, the apartment complex features stylishly furnished units with natural lighting and contemporary decor. Residents can enjoy access to facilities including a fitness center, a rooftop garden, and free high-speed WiFi throughout the property.
                Each apartment is equipped with a spacious living area, a fully functional kitchenette, a dining space, and a private bathroom with a rain shower. Green Haven Apartments ensures your comfort with air-conditioned rooms, smart TVs, and plush bedding.
            `,
            neighborhood_description: `
                Green Haven Apartments is located near some of South Jakarta's most popular spots, including Senayan City Mall, Pacific Place, and Gelora Bung Karno Stadium. With easy access to public transportation and just 8 miles from Soekarno-Hatta International Airport, the location is ideal for both short-term and long-term stays.
            `,
            phone_number: '+62-21-555-6789',
            url: 'https://www.greenhavenapartments.com',
            total_room: 50,
        }        
    ]

    const propertyRoomType = [
        {
            name: 'Studio',
            capacity: 2,
            bathrooms: 1,
            price: 3500000,
            total_rooms: 20, 
            propertyId: 3
        },
        {
            name: 'One-Bedroom Apartment',
            capacity: 4,
            bathrooms: 1,
            price: 5000000,
            total_rooms: 20, 
            propertyId: 3
        },
        {
            name: 'Penthouse',
            rooms: 3,
            capacity: 6,
            bathrooms: 2,
            price: 12000000,
            total_rooms: 10, 
            propertyId: 3
        }
    ]

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 3,
            filename: `property_3_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 7,
            filename: `property_3_room_7_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 8,
            filename: `property_3_room_8_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 9,
            filename: `property_3_room_9_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property3HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
    property3HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 3,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 7,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 8,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 9,
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
                    propertyTypeId: 2,
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
                propertyId: 3
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

module.exports = { Property3 }