const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property9 ({tenantAccounts}) {
    const property = [
        {
            name: 'The Riverside Residences',
            country: 'Indonesia',
            address: 'Jl. Raya Kuningan No.18, Kuningan, South Jakarta, Special Capital Region of Jakarta',
            zip_code: '12940',
            city: 'Jakarta',
            location: '-6.232232, 106.828876',
            checkInStartTime: new Date('2024-12-03T14:00:00Z'),
            checkInEndTime: new Date('2024-12-03T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T07:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                The Riverside Residences offers a peaceful and upscale living experience located by the river in South Jakarta. The property is well-situated, just minutes away from the business district and popular dining spots in the city. Each apartment features modern designs with large windows to capture stunning river views and abundant natural light. Residents can take advantage of a variety of amenities, including an outdoor swimming pool, a gym, a spa, and a restaurant. 
                Every unit is designed with contemporary comforts such as fully equipped kitchens, spacious living rooms, walk-in closets, and luxurious bathrooms with high-end fittings. The residences provide round-the-clock concierge service, and the property offers secure, private parking for residents.
            `,
            neighborhood_description: `
                The Riverside Residences is located near several popular Jakarta attractions such as Setiabudi One, Grand Indonesia Mall, and Plaza Semanggi. With easy access to public transportation and just a 10-minute drive to Soekarno-Hatta International Airport, it is a prime location for both tourists and professionals. The scenic riverbank also provides a serene retreat for evening walks or dining with a view.
            `,
            phone_number: '+62-21-987-6543',
            url: 'https://www.theriversideresidences.com',
            total_room: 60,
        }
    ]
    

    const propertyRoomType = [
        {
            name: 'River View Studio',
            capacity: 2,
            bathrooms: 1,
            price: 4000000,
            total_rooms: 20,
            propertyId: 9
        },
        {
            name: 'Deluxe One-Bedroom Apartment',
            capacity: 4,
            bathrooms: 1,
            price: 6000000,
            total_rooms: 20,
            propertyId: 9
        },
        {
            name: 'Luxury Two-Bedroom Suite',
            rooms: 2,
            capacity: 5,
            bathrooms: 2,
            price: 8500000,
            total_rooms: 20,
            propertyId: 9
        }
    ]

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 9,
            filename: `property_9_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 25,
            filename: `property_9_room_25_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 26,
            filename: `property_9_room_26_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 27,
            filename: `property_9_room_27_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property9HasFacility = [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18]
    property9HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 9,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 11, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 25,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 11, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 26,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 11, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 27,
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
                propertyId: 9
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

module.exports = { Property9 }