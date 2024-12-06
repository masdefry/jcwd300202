const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property6 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'M-Town Residence Gading Serpong by J`s Luxury Apartment',
            address: 'Jl. Gading Serpong Boulevard Blok M5 No.3, Pakulonan Bar., Kec. Cpl. Dua, Tangerang Regency, Banten',
            zipCode: '15810',
            location: '-6.2425476, 106.6296588',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
    const propertyDetail = {
            propertyDescription: `
                Featuring a garden, M-Town Residence Gading Serpong by J's Luxury Apartment provides accommodations in Tangerang. 
                The air-conditioned accommodation is 6.1 miles from Indonesia Convention Exhibition, and guests can benefit from private parking available on site and free Wifi. 
                The apartment offers an outdoor swimming pool with a fence, as well as a fitness room and an elevator.
            `,
            neighborhoodDescription: 'Central Park Mall is 16 miles from M-Town Residence Gading Serpong by J`s Luxury Apartment, while Tanah Abang Market is 18 miles away. Soekarno-Hatta International Airport is 8.7 miles from the property.',
            phoneNumber: '+53-545-233-533',
            url: 'https://jlux.com/id/m-town/',
            totalRooms: 30,
        }
    
    
    
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty6 = await prisma.property.create({
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
                propertyId: createdProperty6.id
            }
        })

        const createdProperty6RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Ultimate',
                rooms: 2,
                capacity: 4,
                bathrooms: 2,
                price: 2000000,
                totalRooms: 5,
                propertyId: createdProperty6.id
            },
        })
        const createdProperty6RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Gold',
                capacity: 2,
                bathrooms: 1,
                price: 1300000,
                totalRooms: 10,
                propertyId: createdProperty6.id
            },
        })
        const createdProperty6RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Silver',
                capacity: 2,
                bathrooms: 1,
                price: 800000,
                totalRooms: 15,
                propertyId: createdProperty6.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_6_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty6RoomType1.id,
                filename: `property_6_room_16_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty6RoomType2.id,
                filename: `property_6_room_17_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty6RoomType3.id,
                filename: `property_6_room_18_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property6HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
        property6HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty6.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
        
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty6RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty6RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 10, 13, 15, 16, 17, 18, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty6RoomType3.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        
        await prisma.roomHasFacilities.createMany({
            data: roomHasFacility,
            skipDuplicates: true
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

module.exports = { Property6 }