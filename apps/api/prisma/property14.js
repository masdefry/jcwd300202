const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property14 ({ tenantAccounts }) {
    const uuid = v4()
    const id = uuid
    const property = {            
        name: 'Best Western Papilio Hotel',
        country: 'Indonesia',
        address: 'Jl. Ahmad Yani No.176-178, Gayungan, Gayungan District, Surabaya, East Java',
        zipCode: '60235',
        city: 'Surabaya',
        location: '-7.3311302,112.7273021',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Boasting a rooftop pool overlooking the city, Best Western Papilio Hotel is conveniently located a 3-minute drive away from City of Tomorrow and a 10-minute drive from Surabaya Carnival Night Market. 
        Free WiFi access is available throughout. Staff at the 24-hour front desk can assist with car hire and airport transfers, while the concierge service will be happy to assist with luggage storage. 
        There is also meeting/banqueting facilities and a business centre. After a day of sightseeing guests may enjoy relaxing massage at the spa and wellness centre.
        `,
        neighborhoodDescription: `
            Best Western Papilio Hotel is a 15-minute drive away from Royal Plaza and a 20-minute drive away from Juanda International Airport.
        `,
        phoneNumber: '+62-593-999-844',
        url: 'https://bwpapilio.com/',
        totalRooms: 120,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty14 = await prisma.property.create({
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
                propertyId: createdProperty14.id
            }
        })
    
        const createdProperty14RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Special',
                capacity: 2,
                bathrooms: 1,
                price: 800000,
                totalRooms: 20,
                propertyId: createdProperty14.id
            }
        })
        const createdProperty14RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe',
                capacity: 2,
                bathrooms: 1,
                price: 650000,
                totalRooms: 40,
                propertyId: createdProperty14.id
            },
        })
        const createdProperty14RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Comfort',
                capacity: 2,
                bathrooms: 1,
                price: 445000,
                totalRooms: 60,
                propertyId: createdProperty14.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_14_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty14RoomType1.id,
                filename: `property_14_room_40_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty14RoomType2.id,
                filename: `property_14_room_41_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty14RoomType3.id,
                filename: `property_14_room_42_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property14HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property14HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty14.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty14RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty14RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty14RoomType3.id,
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

module.exports = { Property14 }