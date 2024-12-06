const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property3 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Green Haven Apartments',
        country: 'Indonesia',
        address: 'Jl. Senopati No.45, Kebayoran Baru, South Jakarta, Special Capital Region of Jakarta',
        zipCode: '12190',
        city: 'Jakarta',
        location: '-6.236845, 106.807230',
        checkInStartTime: new Date('2024-12-03T14:00:00Z'),
        checkInEndTime: new Date('2024-12-03T21:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T07:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T11:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
            Nestled in the heart of South Jakarta, Green Haven Apartments offers a modern and cozy living experience. Just a short stroll from the vibrant Senopati area, the apartment complex features stylishly furnished units with natural lighting and contemporary decor. Residents can enjoy access to facilities including a fitness center, a rooftop garden, and free high-speed WiFi throughout the property.
            Each apartment is equipped with a spacious living area, a fully functional kitchenette, a dining space, and a private bathroom with a rain shower. Green Haven Apartments ensures your comfort with air-conditioned rooms, smart TVs, and plush bedding.
        `,
        neighborhoodDescription: `
            Green Haven Apartments is located near some of South Jakarta's most popular spots, including Senayan City Mall, Pacific Place, and Gelora Bung Karno Stadium. With easy access to public transportation and just 8 miles from Soekarno-Hatta International Airport, the location is ideal for both short-term and long-term stays.
        `,
        phoneNumber: '+62-21-555-6789',
        url: 'https://www.greenhavenapartments.com',
        totalRooms: 50,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty3 = await prisma.property.create({
            data: {
                id,
                name: property.name,
                countryId,
                address: property.address,
                zipCode: property.zipCode,
                cityId,
                location: property.location,
                checkInStartTime: property.checkInStartTime,
                checkInEndTime: property.checkInEndTime,
                checkOutStartTime: property.checkOutStartTime,
                checkOutEndTime: property.checkOutEndTime,
                propertyTypeId: 2,
                tenantId: tenant.id,
                slug: `${property.name.toLowerCase().split(' ').join('-')}-${id}`
            }
        })
        

        const createdPropertyDetail = await prisma.propertyDetail.create({
            data: {
                propertyDescription: propertyDetail.propertyDescription,
                neighborhoodDescription: propertyDetail.neighborhoodDescription,
                phoneNumber: propertyDetail.phoneNumber,
                url: propertyDetail.url,
                totalRooms: propertyDetail.totalRooms,
                propertyId: createdProperty3.id
            }
        })
    
        const createdProperty3RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Studio',
                capacity: 2,
                bathrooms: 1,
                price: 3500000,
                totalRooms: 20, 
                propertyId: createdProperty3.id
            }
        })
        const createdProperty3RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'One-Bedroom Apartment',
                capacity: 4,
                bathrooms: 1,
                price: 5000000,
                totalRooms: 20, 
                propertyId: createdProperty3.id
            },
        })
        const createdProperty3RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Penthouse',
                rooms: 3,
                capacity: 6,
                bathrooms: 2,
                price: 12000000,
                totalRooms: 10, 
                propertyId: createdProperty3.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_3_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty3RoomType1.id,
                filename: `property_3_room_7_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty3RoomType2.id,
                filename: `property_3_room_8_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty3RoomType3.id,
                filename: `property_3_room_9_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property3HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
        property3HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty3.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty3RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty3RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty3RoomType3.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
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