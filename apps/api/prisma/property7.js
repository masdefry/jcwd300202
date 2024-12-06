const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property7 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Urban Oasis Apartments',
        address: 'Jl. Kemang Raya No.99, Bangka, Mampang Prapatan, South Jakarta, Special Capital Region of Jakarta',
        zipCode: '12730',
        location: '-6.260664, 106.813970',
        checkInStartTime: new Date('2024-12-03T14:00:00Z'),
        checkInEndTime: new Date('2024-12-03T21:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T07:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T11:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
            Urban Oasis Apartments bring a fresh and tranquil vibe to the vibrant Kemang neighborhood in South Jakarta. Surrounded by lush greenery and featuring a contemporary design, this apartment complex is perfect for individuals and families seeking a peaceful urban retreat. Amenities include a rooftop lounge, a resort-style swimming pool, a yoga studio, and secure underground parking. 
            Each unit is thoughtfully designed with an open-plan layout, a private balcony, and floor-to-ceiling windows that let in plenty of natural light. Fully furnished with modern appliances, Urban Oasis Apartments ensure a hassle-free living experience.
        `,
        neighborhoodDescription: `
            Located in the bustling area of Kemang, Urban Oasis Apartments are close to popular cafes, international schools, and art galleries. Nearby attractions include Kemang Village Mall, Pejaten Village, and Cilandak Town Square. With Soekarno-Hatta International Airport just 10 miles away and easy access to public transportation, this property offers the perfect balance of convenience and charm.
        `,
        phoneNumber: '+62-21-789-4567',
        url: 'https://www.urbanoasis.com',
        totalRooms: 70,
    } 
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty7 = await prisma.property.create({
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
                propertyId: createdProperty7.id
            }
        })
    
        const createdProperty7RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Garden View Studio',
                capacity: 2,
                bathrooms: 1,
                price: 3800000,
                totalRooms: 30, 
                propertyId: createdProperty7.id
            }
        })
        const createdProperty7RoomType2 = await prisma.propertyRoomType.create({
            data: {       
                name: 'Parkside Two-Bedroom',
                rooms: 2,
                capacity: 4,
                bathrooms: 1,
                price: 5500000,
                totalRooms: 25,
                propertyId: createdProperty7.id
            },
        })
        const createdProperty7RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Skyline Penthouse',
                rooms: 3,
                capacity: 6,
                bathrooms: 2,
                price: 12000000,
                totalRooms: 15,
                propertyId: createdProperty7.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_7_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty7RoomType1.id,
                filename: `property_7_room_19_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty7RoomType2.id,
                filename: `property_7_room_20_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty7RoomType3.id,
                filename: `property_7_room_21_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property7HasFacility = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 17, 18]
        property7HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty7.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 3, 11, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty7RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 3, 4, 7, 11, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty7RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 11, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty7RoomType3.id,
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

module.exports = { Property7 }

