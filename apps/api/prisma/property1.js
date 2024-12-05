const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property1 ({ tenantAccounts }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'Pan Pacific Jakarta',
            country: 'Indonesia',
            address: 'Thamrin Nine, Luminary Tower Jalan MH Thamrin No 10, Central Jakarta, Jakarta, Special Capital Region of Jakarta',
            zipCode: '10230',
            city: 'Jakarta',
            location: '-6.1980338, 106.8213679',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
    const propertyDetail = {
        propertyDescription: `
            Located in Jakarta, a 8-minute walk from Selamat Datang Monument, Pan Pacific Jakarta has accommodations with a restaurant, free private parking and a bar. Each room at the 5-star hotel has city views, and guests can enjoy access to an indoor pool. The property provides a 24-hour front desk, airport transportation, room service and free WiFi throughout the property.
            The hotel will provide guests with air-conditioned rooms offering a desk, a coffee machine, a minibar, a safety deposit box, a flat-screen TV and a private bathroom with a shower. At Pan Pacific Jakarta the rooms come with bed linen and towels.
            The daily breakfast offers buffet, continental or Asian options.
        `,
        neighborhoodDescription: 'Popular points of interest near the accommodation include Grand Indonesia Mall, Sarinah and Tanah Abang Market. Halim Perdanakusuma International Airport is 15 miles from the property.',
        phoneNumber: '+1-555-123-4567',
        url: 'https://www.panpacific.com',
        totalRooms: 100,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty1 = await prisma.property.create({
            data: {
                id,
                name: property.name,
                country: property.country,
                address: property.address,
                zipCode: property.zipCode,
                city: property.city,
                location: property.location,
                checkInStartTime: property.checkInStartTime,
                checkInEndTime: property.checkInEndTime,
                checkOutStartTime: property.checkOutStartTime,
                checkOutEndTime: property.checkOutEndTime,
                propertyTypeId: 1,
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
                propertyId: createdProperty1.id
            }
        })
    
        const createdProperty1RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Suite',
                rooms: 3,
                capacity: 6,
                bathrooms: 2,
                price: 8000000,
                totalRooms: 30,
                propertyId: createdProperty1.id
            }
        })
        const createdProperty1RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Premiere',
                capacity: 4,
                bathrooms: 1,
                price: 4500000,
                totalRooms: 30,
                propertyId: createdProperty1.id
            },
        })
        const createdProperty1RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe',
                capacity: 2,
                bathrooms: 1,
                price: 2500000,
                totalRooms: 40,
                propertyId: createdProperty1.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_1_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty1RoomType1.id,
                filename: `property_1_room_1_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty1RoomType2.id,
                filename: `property_1_room_2_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty1RoomType3.id,
                filename: `property_1_room_3_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property1HasFacility = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property1HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty1.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 3, 4, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty1RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty1RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty1RoomType3.id,
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

module.exports = { Property1 }
