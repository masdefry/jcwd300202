const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property14 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {            
        name: 'Best Western Papilio Hotel',
        country: 'Indonesia',
        address: 'Jl. Ahmad Yani No.176-178, Gayungan, Gayungan District, Surabaya, East Java',
        zipCode: '60235',
        city: 'Surabaya',
        location: 'https://maps.app.goo.gl/rxzVQHB5zdhb2uMT6',
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
        phoneNumber: '08593999844',
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
                countryId,
                address: property.address,
                zipCode: property.zipCode,
                cityId,
                star: 4,
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
                name: 'Penthouse Suite',
                description: `The Penthouse Suite offers the height of luxury, with expansive floor plans and breathtaking views of the city. This opulent suite features a large living area with a designer sofa, a dining area, and a fully equipped kitchen. The master bedroom includes a king-sized bed with high-thread-count linens, while the en-suite bathroom offers a soaking tub, a rain shower, and a private sauna. Guests can enjoy additional amenities such as a private balcony, a minibar, and a sound system. Perfect for special occasions or an elevated experience, the Penthouse Suite delivers the ultimate in comfort, style, and privacy.`,
                capacity: 2,
                bathrooms: 1,
                price: 800000,
                totalRooms: 20,
                propertyId: createdProperty14.id
            }
        })
        const createdProperty14RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Executive Suite',
                description: `The Executive Suite is designed for guests seeking extra space and comfort during their stay. This elegant suite features a separate living area with a sofa, a large work desk, and a king-sized bed. The room is equipped with a flat-screen TV, a minibar, a coffee machine, and high-speed internet access. The luxurious bathroom includes a soaking tub, a rain shower, and premium bath products. Ideal for business travelers or those looking to indulge in a more spacious and luxurious experience, the Executive Suite offers a perfect blend of functionality and relaxation.`,
                capacity: 2,
                bathrooms: 1,
                price: 650000,
                totalRooms: 40,
                propertyId: createdProperty14.id
            },
        })
        const createdProperty14RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Standard Room',
                description: `The Standard Room offers comfort and convenience with a straightforward design, ideal for guests looking for a practical and affordable option. Featuring a queen-sized bed with premium linens, this room also includes a work desk, a flat-screen TV, and a mini-fridge. The en-suite bathroom is equipped with a shower and complimentary toiletries. Perfect for short stays or business trips, the Standard Room provides all the essentials for a relaxing stay in a cozy environment.`,
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