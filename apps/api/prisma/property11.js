const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property11 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Seaside Inn',
        country: 'Indonesia',
        address: 'Jl. Pantai No.12, Ancol, North Jakarta, Special Capital Region of Jakarta',
        zipCode: '14430',
        city: 'Jakarta',
        location: '-6.115735, 106.830924',
        checkInStartTime: new Date('2024-12-03T13:00:00Z'),
        checkInEndTime: new Date('2024-12-03T20:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Situated near the beautiful coastline of Ancol, Seaside Inn offers a cozy and affordable stay with breathtaking views of the sea. The inn features a range of well-furnished rooms with natural light, designed for a peaceful retreat. Guests can enjoy a relaxing atmosphere with facilities such as a common lounge, free WiFi, and a small café offering local delicacies.
        Each room comes with a comfortable bed, a flat-screen TV, air conditioning, and a private bathroom with a shower. Seaside Inn ensures a welcoming and homely environment for travelers of all kinds.
        `,
        neighborhoodDescription: `
            Seaside Inn is conveniently located near attractions like Ancol Dreamland, Dunia Fantasi, and the beautiful Ancol Beach. The area is well connected with public transport and is only 5 miles away from Soekarno-Hatta International Airport, making it an excellent choice for both tourists and business travelers.
        `,
        phoneNumber: '+62-21-555-1234',
        url: 'https://www.seasideinnjakarta.com',
        totalRooms: 30
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty11 = await prisma.property.create({
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
                propertyTypeId: 12,
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
                propertyId: createdProperty11.id
            }
        })
    
        const createdProperty11RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Single Room',
                description: 'The Single Room offers a cozy and functional living space, designed for solo travelers or business trips. With all the essential amenities in a compact layout, it ensures convenience, comfort, and affordability for short stays or quick getaways. Ideal for individuals who value simplicity and practicality.',
                capacity: 1,
                bathrooms: 1,
                price: 2000000,
                totalRooms: 12, 
                propertyId: createdProperty11.id
            }
        })
        const createdProperty11RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Double Room',
                description: 'The Double Room provides a perfect option for couples, friends, or small groups seeking a balance of comfort and affordability. Featuring a well-designed living area, shared bathroom, and cozy sleeping arrangements, it offers a welcoming space that caters to both relaxation and convenience.',
                capacity: 2,
                bathrooms: 1,
                price: 3000000,
                totalRooms: 10,  
                propertyId: createdProperty11.id
            },
        })
        const createdProperty11RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Family Suite',
                description: 'The Family Suite is the ultimate choice for families and groups. Offering two separate bedrooms, two bathrooms, and plenty of space, it ensures a relaxing and convenient experience for all. With modern furnishings and thoughtful design, the Family Suite combines style and functionality, making it ideal for both short and extended stays.',
                rooms: 2,
                capacity: 4,
                bathrooms: 2,
                price: 6000000,
                totalRooms: 8,  
                propertyId: createdProperty11.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_11_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty11RoomType1.id,
                filename: `property_11_room_31_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty11RoomType2.id,
                filename: `property_11_room_32_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty11RoomType3.id,
                filename: `property_11_room_33_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property11HasFacility = [5, 6, 8, 9, 10, 11, 18]
        property11HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty11.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 3, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty11RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 3, 4, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty11RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 3, 4, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty11RoomType3.id,
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

module.exports = { Property11 }
