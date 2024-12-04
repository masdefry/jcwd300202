const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property11 ({tenantAccounts}) {
    const property = [
        {
            name: 'Seaside Inn',
            country: 'Indonesia',
            address: 'Jl. Pantai No.12, Ancol, North Jakarta, Special Capital Region of Jakarta',
            zip_code: '14430',
            city: 'Jakarta',
            location: '-6.115735, 106.830924',
            checkInStartTime: new Date('2024-12-03T13:00:00Z'),
            checkInEndTime: new Date('2024-12-03T20:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Situated near the beautiful coastline of Ancol, Seaside Inn offers a cozy and affordable stay with breathtaking views of the sea. The inn features a range of well-furnished rooms with natural light, designed for a peaceful retreat. Guests can enjoy a relaxing atmosphere with facilities such as a common lounge, free WiFi, and a small café offering local delicacies.
                Each room comes with a comfortable bed, a flat-screen TV, air conditioning, and a private bathroom with a shower. Seaside Inn ensures a welcoming and homely environment for travelers of all kinds.
            `,
            neighborhood_description: `
                Seaside Inn is conveniently located near attractions like Ancol Dreamland, Dunia Fantasi, and the beautiful Ancol Beach. The area is well connected with public transport and is only 5 miles away from Soekarno-Hatta International Airport, making it an excellent choice for both tourists and business travelers.
            `,
            phone_number: '+62-21-555-1234',
            url: 'https://www.seasideinnjakarta.com',
            total_room: 30,
        }        
    ]    

    const propertyRoomType = [
        {
            name: 'Single Room',
            capacity: 1,
            bathrooms: 1,
            price: 2000000,
            total_rooms: 12, 
            propertyId: 11
        },
        {
            name: 'Double Room',
            capacity: 2,
            bathrooms: 1,
            price: 3000000,
            total_rooms: 10, 
            propertyId: 11
        },
        {
            name: 'Family Suite',
            rooms: 2,
            capacity: 4,
            bathrooms: 2,
            price: 6000000,
            total_rooms: 8, 
            propertyId: 11
        }
    ]    

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 11,
            filename: `property_11_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 31,
            filename: `property_11_room_31_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 32,
            filename: `property_11_room_32_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 33,
            filename: `property_11_room_33_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property11HasFacility = [5, 6, 8, 9, 10, 11, 18]
    property11HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 11,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [2, 3, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 31,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 3, 4, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 32,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 3, 4, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 33,
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
                    propertyTypeId: 12,
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
                propertyId: 11
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

module.exports = { Property11 }