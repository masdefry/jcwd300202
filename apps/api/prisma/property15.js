const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property15 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Elysian Towers',
        address: '789 Park Avenue, Upper East Side, New York, NY 10021',
        zipCode: '10021',
        location: 'https://maps.app.goo.gl/Zejt8Goxn7JXpvEbA',
        checkInStartTime: new Date('2024-12-05T15:00:00Z'),
        checkInEndTime: new Date('2024-12-05T22:00:00Z'),
        checkOutStartTime: new Date('2024-12-06T08:00:00Z'),
        checkOutEndTime: new Date('2024-12-06T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Elysian Towers is the epitome of luxury in the heart of Manhattan's prestigious Upper East Side. This iconic residential building combines timeless elegance with modern sophistication, offering spacious suites with breathtaking views of Central Park and the city skyline. 
        Residents have exclusive access to world-class amenities, including a heated indoor pool, a private cinema, a fully-equipped wellness center, and a rooftop terrace with a lounge area. Each unit features high ceilings, marble flooring, designer furnishings, and state-of-the-art appliances for a truly premium living experience.
        `,
        neighborhoodDescription: `
            Elysian Towers is perfectly situated near cultural landmarks like the Metropolitan Museum of Art, the Guggenheim, and Madison Avenue's high-end shopping district. With its proximity to Central Park and excellent transport connections, it offers the ideal blend of urban excitement and serene living.
        `,
        phoneNumber: '012125557890',
        url: 'https://www.elysiantowers.com',
        totalRooms: 85,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty15 = await prisma.property.create({
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
                propertyId: createdProperty15.id
            }
        })
    
        const createdProperty15RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Skyline Studio',
                description: 'A modern and stylish studio apartment with a breathtaking skyline view. Perfect for solo travelers or couples seeking comfort and elegance.',
                capacity: 2,
                bathrooms: 1,
                price: 6000000,
                totalRooms: 35,
                propertyId: createdProperty15.id
            }
        })
        const createdProperty15RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Parkview One-Bedroom Suite',
                description: 'A cozy and well-designed one-bedroom suite with scenic park views. Ideal for small families, couples, or business travelers looking for comfort and convenience.',
                capacity: 3,
                bathrooms: 1,
                price: 8500000,
                totalRooms: 30, 
                propertyId: createdProperty15.id
            },
        })
        const createdProperty15RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Grand Penthouse',
                description: 'Experience unparalleled luxury in the Grand Penthouse. With three spacious bedrooms, three bathrooms, and panoramic city views, this penthouse offers the ultimate in comfort and style for families or larger groups.',
                rooms: 3,
                capacity: 6,
                bathrooms: 3,
                price: 10000000,
                totalRooms: 20,
                propertyId: createdProperty15.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_15_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty15RoomType1.id,
                filename: `property_15_room_43_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty15RoomType2.id,
                filename: `property_15_room_44_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty15RoomType3.id,
                filename: `property_15_room_45_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property15HasFacility = [1, 4, 5, 8, 9, 10, 11, 12, 13, 17, 18]
        property15HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty15.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 7, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty15RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 7, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty15RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 7, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty15RoomType3.id,
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

module.exports = { Property15 }
