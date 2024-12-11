const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property19 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'The Grandview Residences',
        country: 'United States',
        address: '1012 Sunset Boulevard, Los Angeles, CA 90026',
        zipCode: '90026',
        city: 'Los Angeles',
        location: '34.070212, -118.258470',
        checkInStartTime: new Date('2024-12-03T16:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T09:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        The Grandview Residences represent the pinnacle of luxury living in Los Angeles. Located in the heart of the city with sweeping views of downtown, the Hollywood Hills, and the Pacific Ocean, this high-rise property offers a curated selection of one-of-a-kind homes. Featuring spacious floor plans, state-of-the-art smart home technology, and premium finishes, each apartment is designed for comfort and elegance.
        The property boasts an array of exclusive amenities, including a 24-hour concierge, a world-class fitness center, an indoor-outdoor lounge with panoramic views, a heated swimming pool, and a private screening room.
        `,
        neighborhoodDescription: `
            The Grandview Residences are situated on Sunset Boulevard, one of Los Angeles' most iconic streets, surrounded by upscale dining, entertainment, and shopping. Just minutes from the Griffith Observatory, Runyon Canyon, and the Sunset Strip, residents can experience both the vibrant culture of LA and the tranquility of hillside living. With easy access to major highways and LAX, this location offers the perfect balance of city life and privacy.
        `,
        phoneNumber: '+1-323-555-9876',
        url: 'https://www.grandviewresidences.com',
        totalRooms: 50,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty19 = await prisma.property.create({
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
                propertyId: createdProperty19.id
            }
        })
    
        const createdProperty19RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Executive Studio',
                description: 'A modern and minimalist studio ideal for young professionals or travelers looking for a functional living space.',
                capacity: 2,
                bathrooms: 1,
                price: 3500000,
                totalRooms: 15, 
                propertyId: createdProperty19.id
            }
        })
        const createdProperty19RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Luxury One-Bedroom Suite',
                description: 'Experience the perfect balance of luxury and comfort with spacious living, premium finishes, and modern amenities.',
                capacity: 4,
                bathrooms: 1,
                price: 5500000,
                totalRooms: 20, 
                propertyId: createdProperty19.id
            },
        })
        const createdProperty19RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Skyline Penthouse',
                description: 'Indulge in breathtaking panoramic views with this luxurious penthouse. Features three bedrooms, two bathrooms, and elegant living spaces.',
                rooms: 3,
                capacity: 6,
                bathrooms: 2,
                price: 15000000,
                totalRooms: 15, 
                propertyId: createdProperty19.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_19_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty19RoomType1.id,
                filename: `property_19_room_55_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty19RoomType2.id,
                filename: `property_19_room_56_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty19RoomType3.id,
                filename: `property_19_room_57_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property19HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
        property19HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty19.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 3, 4, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty19RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 3, 4, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty19RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty19RoomType3.id,
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

module.exports = { Property19 }

