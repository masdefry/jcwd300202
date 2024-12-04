const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property13 ({tenantAccounts}) {
    const property = [
        {
            name: 'Serenity Park Residences',
            country: 'Indonesia',
            address: 'Jl. Rasuna Said No.35, Kuningan, Setiabudi, South Jakarta, Special Capital Region of Jakarta',
            zip_code: '12950',
            city: 'Jakarta',
            location: '-6.214992, 106.832457',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Serenity Park Residences offers a luxurious and tranquil living experience in the heart of Jakarta's business district, Kuningan. Designed with modern architecture and lush green landscapes, the property caters to professionals and families looking for both comfort and convenience. Residents can enjoy top-tier amenities such as an Olympic-sized swimming pool, a state-of-the-art fitness center, children's play areas, and private meeting rooms.
                Each unit comes fully furnished with high-end finishes, a spacious open-plan kitchen, a living area, and an en-suite bathroom. With 24-hour security and concierge services, Serenity Park Residences ensure peace of mind and a premium living experience.
            `,
            neighborhood_description: `
                Located in the prestigious Kuningan area, Serenity Park Residences provide easy access to Jakarta's key business hubs, upscale shopping malls such as Lotte Shopping Avenue and Plaza Indonesia, and entertainment options. The property is well-connected with nearby MRT and TransJakarta stops, and it's only a 30-minute drive to Soekarno-Hatta International Airport. It's an ideal choice for those who value connectivity and luxury.
            `,
            phone_number: '+62-21-567-8910',
            url: 'https://www.serenityparkresidences.com',
            total_room: 80,
        }
    ]    

    const propertyRoomType = [
        {
            name: 'Deluxe Suite',
            capacity: 2,
            bathrooms: 1,
            price: 4000000,
            total_rooms: 30,
            propertyId: 13
        },
        {
            name: 'Executive Apartment',
            capacity: 4,
            bathrooms: 2,
            price: 6000000,
            total_rooms: 30,
            propertyId: 13
        },
        {
            name: 'Skyline Penthouse',
            rooms: 3,
            capacity: 8,
            bathrooms: 3,
            price: 15000000,
            total_rooms: 20,
            propertyId: 13
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 13,
            filename: `property_13_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 37,
            filename: `property_13_room_37_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 38,
            filename: `property_13_room_38_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 39,
            filename: `property_13_room_39_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property13HasFacility = [1, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
    property13HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 13,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 3, 7, 13, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 37,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 3, 4, 5, 8, 13, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 38,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 39,
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
                propertyId: 13
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

module.exports = { Property13 }