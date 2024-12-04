const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property19 ({tenantAccounts}) {
    const property = [
        {
            name: 'The Grandview Residences',
            country: 'United States',
            address: '1012 Sunset Boulevard, Los Angeles, CA 90026',
            zip_code: '90026',
            city: 'Los Angeles',
            location: '34.070212, -118.258470',
            checkInStartTime: new Date('2024-12-03T16:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T09:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                The Grandview Residences represent the pinnacle of luxury living in Los Angeles. Located in the heart of the city with sweeping views of downtown, the Hollywood Hills, and the Pacific Ocean, this high-rise property offers a curated selection of one-of-a-kind homes. Featuring spacious floor plans, state-of-the-art smart home technology, and premium finishes, each apartment is designed for comfort and elegance.
                The property boasts an array of exclusive amenities, including a 24-hour concierge, a world-class fitness center, an indoor-outdoor lounge with panoramic views, a heated swimming pool, and a private screening room.
            `,
            neighborhood_description: `
                The Grandview Residences are situated on Sunset Boulevard, one of Los Angeles' most iconic streets, surrounded by upscale dining, entertainment, and shopping. Just minutes from the Griffith Observatory, Runyon Canyon, and the Sunset Strip, residents can experience both the vibrant culture of LA and the tranquility of hillside living. With easy access to major highways and LAX, this location offers the perfect balance of city life and privacy.
            `,
            phone_number: '+1-323-555-9876',
            url: 'https://www.grandviewresidences.com',
            total_room: 50,
        }
    ]

    const propertyRoomType = [
        {
            name: 'Executive Studio',
            capacity: 2,
            bathrooms: 1,
            price: 3500000,
            total_rooms: 15, 
            propertyId: 19
        },
        {
            name: 'Luxury One-Bedroom Suite',
            capacity: 4,
            bathrooms: 1,
            price: 5500000,
            total_rooms: 20, 
            propertyId: 19
        },
        {
            name: 'Skyline Penthouse',
            rooms: 3,
            capacity: 6,
            bathrooms: 2,
            price: 15000000,
            total_rooms: 15, 
            propertyId: 19
        }
    ];
    

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 19,
            filename: `property_3_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 55,
            filename: `property_3_room_7_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 56,
            filename: `property_3_room_8_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 57,
            filename: `property_3_room_9_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property19HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
    property19HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 19,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 3, 4, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 55,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 3, 4, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 56,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 57,
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
                propertyId: 19
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

module.exports = { Property19 }