const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property5 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Skyline Residence',
        country: 'Indonesia',
        address: 'Jl. Setiabudi No.88, Setiabudi, South Jakarta, Special Capital Region of Jakarta',
        zipCode: '12910',
        city: 'Jakarta',
        location: '-6.207620, 106.821580',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T22:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
            Skyline Residence offers a luxurious and serene living experience in the bustling city of Jakarta. Located in the prestigious Setiabudi area, the apartment complex features modern and elegant designs with breathtaking city views. Residents can enjoy premium amenities such as a fully-equipped gym, infinity pool, co-working spaces, and high-speed internet throughout the building.
            Each unit is designed with spacious layouts, featuring a fully-equipped kitchen, comfortable living area, and modern bathrooms with premium fittings. Skyline Residence ensures a perfect blend of comfort and style for both business and leisure travelers.
        `,
        neighborhoodDescription: `
            Skyline Residence is conveniently situated near key attractions like Kota Kasablanka Mall, Epicentrum Walk, and Mega Kuningan business district. With easy access to the MRT station and just 7 miles from Halim Perdanakusuma International Airport, it offers unparalleled convenience for commuting and leisure activities.
        `,
        phoneNumber: '+62-21-567-1234',
        url: 'https://www.skylineresidence.com',
        totalRooms: 60,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty5 = await prisma.property.create({
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
                propertyId: createdProperty5.id
            }
        })
    
        const createdProperty5RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Studio',
                description: 'A modern Studio designed with simplicity and functionality in mind, perfect for solo travelers or couples seeking efficiency. It features an open-plan layout with all the necessary amenities for a relaxed stay. This room type combines style with affordability while maximizing space for an easy living experience. Designed for short or extended stays, it ensures practicality without sacrificing comfort.',
                capacity: 2,
                bathrooms: 1,
                price: 4000000,
                totalRooms: 30,  
                propertyId: createdProperty5.id
            }
        })
        const createdProperty5RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Two-Bedroom Apartment',
                description: 'This Two-Bedroom Apartment offers spacious living with a modern design tailored for families or small groups. It includes two well-appointed bedrooms, a cozy living area, and a bathroom, ensuring both comfort and convenience. Perfect for longer stays, it provides all the necessary amenities while maintaining affordability. Experience flexibility and modern living in this thoughtfully designed space.',
                rooms: 2,
                capacity: 4,
                bathrooms: 1,
                price: 6000000,
                totalRooms: 20, 
                propertyId: createdProperty5.id
            },
        })
        const createdProperty5RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Penthouse Suite',
                description: 'The Penthouse Suite offers a premium and luxurious stay with four spacious bedrooms and three modern bathrooms. It is designed for large families or groups seeking privacy, comfort, and elegance. Guests can enjoy stunning panoramic views, top-tier amenities, and exceptional living space in this exclusive suite. A perfect choice for those who value both style and convenience during their stay.',
                rooms: 4,
                capacity: 8,
                bathrooms: 3,
                price: 15000000,
                totalRooms: 10, 
                propertyId: createdProperty5.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_5_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty5RoomType1.id,
                filename: `property_5_room_13_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty5RoomType2.id,
                filename: `property_5_room_14_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty5RoomType3.id,
                filename: `property_5_room_15_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property5HasFacility = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18]
        property5HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty5.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty5RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty5RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 11, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty5RoomType3.id,
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

module.exports = { Property5 }
