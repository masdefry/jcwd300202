const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property16 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Grand Whiz Poins Simatupang Jakarta',
        address: 'Simatupang, Jl. R.A. Kartini No.1, Lb. Bulus, Cilandak District, Jakarta, Special Capital Region of Jakarta',
        zipCode: '12440',
        location: '-6.2899462, 106.7755765',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Located in Jakarta, 5 km from Kemang, Grand Whiz Poins Square offers accommodation with an outdoor pool. 
        It provides a 24-hour front desk and free WiFi access throughout the premises.
        Rooms at Grand Whiz Poins Square are equipped with air conditioning and a flat-screen cable TV. 
        For convenience, a personal safe and an electric kettle are provided in each room. The private bathroom comes with a shower and free toiletries.
        `,
        neighborhoodDescription: `
            Ragunan Zoo is 5 km from Grand Whiz Poins Square, while Bundaran HI is 12 km from the property. The nearest airport is Halim Perdanakusuma Airport, 12 km from Grand Whiz Poins Square.
        `,
        phoneNumber: '+62-313-943-122',
        url: 'https://grandwhiz.intiwhiz.com/poinssimatupang/home.php',
        totalRooms: 160,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty16 = await prisma.property.create({
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
                propertyId: createdProperty16.id
            }
        })
    
        const createdProperty16RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Superior',
                capacity: 2,
                bathrooms: 1,
                price: 760000,
                totalRooms: 30,
                propertyId: createdProperty16.id
            }
        })
        const createdProperty16RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe',
                capacity: 2,
                bathrooms: 1,
                price: 566000,
                totalRooms: 40,
                propertyId: createdProperty16.id
            },
        })
        const createdProperty16RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Reguler',
                capacity: 2,
                bathrooms: 1,
                price: 431000,
                totalRooms: 90,
                propertyId: createdProperty16.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_16_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty16RoomType1.id,
                filename: `property_16_room_46_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty16RoomType2.id,
                filename: `property_16_room_47_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty16RoomType3.id,
                filename: `property_16_room_48_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property16HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property16HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty16.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty16RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty16RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty16RoomType3.id,
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

module.exports = { Property16 }