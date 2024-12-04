const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function Property7 ({tenantAccounts}) {
    const property = [
        {
            name: 'Urban Oasis Apartments',
            country: 'Indonesia',
            address: 'Jl. Kemang Raya No.99, Bangka, Mampang Prapatan, South Jakarta, Special Capital Region of Jakarta',
            zip_code: '12730',
            city: 'Jakarta',
            location: '-6.260664, 106.813970',
            checkInStartTime: new Date('2024-12-03T14:00:00Z'),
            checkInEndTime: new Date('2024-12-03T21:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T07:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T11:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Urban Oasis Apartments bring a fresh and tranquil vibe to the vibrant Kemang neighborhood in South Jakarta. Surrounded by lush greenery and featuring a contemporary design, this apartment complex is perfect for individuals and families seeking a peaceful urban retreat. Amenities include a rooftop lounge, a resort-style swimming pool, a yoga studio, and secure underground parking. 
                Each unit is thoughtfully designed with an open-plan layout, a private balcony, and floor-to-ceiling windows that let in plenty of natural light. Fully furnished with modern appliances, Urban Oasis Apartments ensure a hassle-free living experience.
            `,
            neighborhood_description: `
                Located in the bustling area of Kemang, Urban Oasis Apartments are close to popular cafes, international schools, and art galleries. Nearby attractions include Kemang Village Mall, Pejaten Village, and Cilandak Town Square. With Soekarno-Hatta International Airport just 10 miles away and easy access to public transportation, this property offers the perfect balance of convenience and charm.
            `,
            phone_number: '+62-21-789-4567',
            url: 'https://www.urbanoasis.com',
            total_room: 70,
        }
    ]   

    const propertyRoomType = [
        {
            name: 'Garden View Studio',
            capacity: 2,
            bathrooms: 1,
            price: 3800000,
            total_rooms: 30, 
            propertyId: 7
        },
        {
            name: 'Parkside Two-Bedroom',
            rooms: 2,
            capacity: 4,
            bathrooms: 1,
            price: 5500000,
            total_rooms: 25,
            propertyId: 7
        },
        {
            name: 'Skyline Penthouse',
            rooms: 3,
            capacity: 6,
            bathrooms: 2,
            price: 12000000,
            total_rooms: 15,
            propertyId: 7
        }
    ]
    

    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 7,
            filename: `property_7_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 19,
            filename: `property_7_room_19_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 20,
            filename: `property_7_room_20_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 21,
            filename: `property_7_room_21_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property7HasFacility = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 17, 18]
    property7HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 7,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [1, 2, 3, 11, 17, 20, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 19,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 3, 4, 7, 11, 15, 17, 20, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 20,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 11, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 21,
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
                propertyId: 7
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

module.exports = { Property7 }