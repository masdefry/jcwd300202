const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property17 ({tenantAccounts}) {
    const property = [
        {
            name: 'The Grand Manhattan Residences',
            country: 'USA',
            address: '15 West 53rd Street, Midtown, New York City, NY 10019',
            zip_code: '10019',
            city: 'New York',
            location: '40.761432, -73.977621',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Situated in the heart of Manhattan, The Grand Manhattan Residences offer unparalleled luxury and modern sophistication. The property boasts breathtaking skyline views and world-class amenities, including an indoor swimming pool, a state-of-the-art fitness center, a private cinema, and a 24/7 concierge service.
                Each residence features custom-designed interiors with Italian marble flooring, gourmet kitchens with high-end appliances, and spa-like bathrooms. Floor-to-ceiling windows flood the spaces with natural light, creating a serene retreat amidst the bustling city.
            `,
            neighborhood_description: `
                Located just steps away from iconic landmarks such as Central Park, Rockefeller Center, and the Museum of Modern Art (MoMA), The Grand Manhattan Residences are at the epicenter of culture, dining, and shopping. Residents enjoy easy access to Fifth Avenue's luxury boutiques, Broadway theaters, and Michelin-starred restaurants. The building is also conveniently located near major transportation hubs, including Grand Central Terminal and Penn Station.
            `,
            phone_number: '+1-212-555-7890',
            url: 'https://www.grandmanhattanresidences.com',
            total_room: 75,
        }
    ]
    
    const propertyRoomType = [
        {
            name: 'Executive Studio',
            capacity: 2,
            bathrooms: 1,
            price: 4500000,
            total_rooms: 25,
            propertyId: 17
        },
        {
            name: 'Premium One-Bedroom Suite',
            capacity: 4,
            bathrooms: 1,
            price: 6500000,
            total_rooms: 30,
            propertyId: 17
        },
        {
            name: 'Grand Penthouse Suite',
            rooms: 3,
            capacity: 6,
            bathrooms: 3,
            price: 15000000,
            total_rooms: 20,
            propertyId: 17
        }
    ];
    

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 17,
            filename: `property_17_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 49,
            filename: `property_17_room_49_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 50,
            filename: `property_17_room_50_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 51,
            filename: `property_17_room_51_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property17HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
    property17HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 17,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 49,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 50,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 51,
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
                propertyId: 17
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

module.exports = { Property17 }