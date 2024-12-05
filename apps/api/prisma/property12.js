const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property12 ({ tenantAccounts }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Juli House by Mahaputra',
        country: 'Indonesia',
        address: '27 Jl. Bisma, Downtown, Ubud,',
        zipCode: '80582',
        city: 'Gianyar Regency',
        location: '-8.5082263,115.2563687',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Situated in the centre of Ubud, Juli House by Mahaputra has an outdoor swimming pool, a garden, free WiFi, and free private parking for guests who drive. 
        This guest house features air-conditioned accommodation with a terrace. 
        The accommodation offers a 24-hour front desk, full-day security and organising tours for guests.
        `,
        neighborhoodDescription: `
            The nearest airport is Ngurah Rai International Airport, 36 km from Juli House by Mahaputra.
        `,
        phoneNumber: '+62-593-113-444',
        url: 'https://mahaputrahotelsandresorts.com/property/juli-house/',
        totalRooms: 10,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty12 = await prisma.property.create({
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
                propertyId: createdProperty12.id
            }
        })
    
        const createdProperty12RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'X-Large',
                capacity: 2,
                bathrooms: 1,
                price: 1000000,
                totalRooms: 2,
                propertyId: createdProperty12.id
            }
        })
        const createdProperty12RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Medium',
                capacity: 2,
                bathrooms: 1,
                price: 750000,
                totalRooms: 4,
                propertyId: createdProperty12.id
            },
        })
        const createdProperty12RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Compact',
                capacity: 2,
                bathrooms: 1,
                price: 490000,
                totalRooms: 4,
                propertyId: createdProperty12.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_12_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty12RoomType1.id,
                filename: `property_12_room_34_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty12RoomType2.id,
                filename: `property_12_room_35_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty12RoomType3.id,
                filename: `property_12_room_36_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property12HasFacility = [8, 9, 12, 18]
        property12HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty12.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty12RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]

        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty12RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty12RoomType3.id,
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

module.exports = { Property12 }