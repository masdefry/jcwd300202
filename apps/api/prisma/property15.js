const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property15 ({tenantAccounts}) {
    const property = [
        {
            name: 'Elysian Towers',
            country: 'USA',
            address: '789 Park Avenue, Upper East Side, New York, NY 10021',
            zip_code: '10021',
            city: 'New York',
            location: '40.767676, -73.965836',
            checkInStartTime: new Date('2024-12-05T15:00:00Z'),
            checkInEndTime: new Date('2024-12-05T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-06T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-06T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Elysian Towers is the epitome of luxury in the heart of Manhattan’s prestigious Upper East Side. This iconic residential building combines timeless elegance with modern sophistication, offering spacious suites with breathtaking views of Central Park and the city skyline. 
                Residents have exclusive access to world-class amenities, including a heated indoor pool, a private cinema, a fully-equipped wellness center, and a rooftop terrace with a lounge area. Each unit features high ceilings, marble flooring, designer furnishings, and state-of-the-art appliances for a truly premium living experience.
            `,
            neighborhood_description: `
                Elysian Towers is perfectly situated near cultural landmarks like the Metropolitan Museum of Art, the Guggenheim, and Madison Avenue’s high-end shopping district. With its proximity to Central Park and excellent transport connections, it offers the ideal blend of urban excitement and serene living.
            `,
            phone_number: '+1-212-555-7890',
            url: 'https://www.elysiantowers.com',
            total_room: 85,
        }
    ]

    const propertyRoomType = [
        {
            name: 'Skyline Studio',
            capacity: 2,
            bathrooms: 1,
            price: 8000,
            total_rooms: 35,
            propertyId: 15
        },
        {
            name: 'Parkview One-Bedroom Suite',
            capacity: 3,
            bathrooms: 1,
            price: 15000,
            total_rooms: 30,
            propertyId: 15
        },
        {
            name: 'Grand Penthouse',
            rooms: 3,
            capacity: 6,
            bathrooms: 3,
            price: 50000,
            total_rooms: 20,
            propertyId: 15
        }
    ]

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 15,
            filename: `property_15_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 43,
            filename: `property_15_room_43_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 44,
            filename: `property_15_room_44_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 45,
            filename: `property_15_room_45_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property15HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
    property15HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 15,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 43,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 44,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 45,
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
                propertyId: 15
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

module.exports = { Property15 }