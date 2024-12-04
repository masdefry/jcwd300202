const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property5 ({tenantAccounts}) {
    const property = [
        {
            name: 'Skyline Residence',
            country: 'Indonesia',
            address: 'Jl. Setiabudi No.88, Setiabudi, South Jakarta, Special Capital Region of Jakarta',
            zip_code: '12910',
            city: 'Jakarta',
            location: '-6.207620, 106.821580',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Skyline Residence offers a luxurious and serene living experience in the bustling city of Jakarta. Located in the prestigious Setiabudi area, the apartment complex features modern and elegant designs with breathtaking city views. Residents can enjoy premium amenities such as a fully-equipped gym, infinity pool, co-working spaces, and high-speed internet throughout the building.
                Each unit is designed with spacious layouts, featuring a fully-equipped kitchen, comfortable living area, and modern bathrooms with premium fittings. Skyline Residence ensures a perfect blend of comfort and style for both business and leisure travelers.
            `,
            neighborhood_description: `
                Skyline Residence is conveniently situated near key attractions like Kota Kasablanka Mall, Epicentrum Walk, and Mega Kuningan business district. With easy access to the MRT station and just 7 miles from Halim Perdanakusuma International Airport, it offers unparalleled convenience for commuting and leisure activities.
            `,
            phone_number: '+62-21-567-1234',
            url: 'https://www.skylineresidence.com',
            total_room: 60,
        }
    ]

    const propertyRoomType = [
        {
            name: 'Studio',
            capacity: 2,
            bathrooms: 1,
            price: 4000000,
            total_rooms: 30, 
            propertyId: 5
        },
        {
            name: 'Two-Bedroom Apartment',
            rooms: 2,
            capacity: 4,
            bathrooms: 1,
            price: 6000000,
            total_rooms: 20, 
            propertyId: 5
        },
        {
            name: 'Penthouse Suite',
            rooms: 4,
            capacity: 8,
            bathrooms: 3,
            price: 15000000,
            total_rooms: 10, 
            propertyId: 5
        }
    ];

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 5,
            filename: `property_5_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 13,
            filename: `property_5_room_13_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 14,
            filename: `property_5_room_14_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 15,
            filename: `property_5_room_15_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property5HasFacility = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18]
    property5HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 5,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 13,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 14,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 11, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 15,
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
                propertyId: 5
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

module.exports = { Property5 }