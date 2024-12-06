const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property17 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'The Grand Manhattan Residences',
        address: '15 West 53rd Street, Midtown, New York City, NY 10019',
        zipCode: '10019',
        location: '40.761432, -73.977621',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T22:00:00Z'),
        checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Situated in the heart of Manhattan, The Grand Manhattan Residences offer unparalleled luxury and modern sophistication. The property boasts breathtaking skyline views and world-class amenities, including an indoor swimming pool, a state-of-the-art fitness center, a private cinema, and a 24/7 concierge service.
        Each residence features custom-designed interiors with Italian marble flooring, gourmet kitchens with high-end appliances, and spa-like bathrooms. Floor-to-ceiling windows flood the spaces with natural light, creating a serene retreat amidst the bustling city.
        `,
        neighborhoodDescription: `
            Located just steps away from iconic landmarks such as Central Park, Rockefeller Center, and the Museum of Modern Art (MoMA), The Grand Manhattan Residences are at the epicenter of culture, dining, and shopping. Residents enjoy easy access to Fifth Avenue's luxury boutiques, Broadway theaters, and Michelin-starred restaurants. The building is also conveniently located near major transportation hubs, including Grand Central Terminal and Penn Station.
        `,
        phoneNumber: '+1-212-555-7890',
        url: 'https://www.grandmanhattanresidences.com',
        totalRooms: 75,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty17 = await prisma.property.create({
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
                propertyId: createdProperty17.id
            }
        })
    
        const createdProperty17RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Executive Studio',
                capacity: 2,
                bathrooms: 1,
                price: 4500000,
                totalRooms: 25,
                propertyId: createdProperty17.id
            }
        })
        const createdProperty17RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Premium One-Bedroom Suite',
                capacity: 4,
                bathrooms: 1,
                price: 6500000,
                totalRooms: 30,
                propertyId: createdProperty17.id
            },
        })
        const createdProperty17RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Grand Penthouse Suite',
                rooms: 3,
                capacity: 6,
                bathrooms: 3,
                price: 15000000,
                totalRooms: 20, 
                propertyId: createdProperty17.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_17_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty17RoomType1.id,
                filename: `property_17_room_49_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty17RoomType2.id,
                filename: `property_17_room_50_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty17RoomType3.id,
                filename: `property_17_room_51_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property17HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
        property17HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty17.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty17RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty17RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty17RoomType3.id,
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

module.exports = { Property17 }
