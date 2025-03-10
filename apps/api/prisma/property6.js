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
            location: 'https://maps.app.goo.gl/QtfwUvNhz669HEUj9',
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
            neighborhoodDescription: "Central Park Mall is 16 miles from M-Town Residence Gading Serpong by J's Luxury Apartment, while Tanah Abang Market is 18 miles away. Soekarno-Hatta International Airport is 8.7 miles from the property.",
            phoneNumber: '08545233533',
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
                name: 'Oceanfront Suite',
                description: `The Oceanfront Suite offers breathtaking views of the sea, providing a perfect blend of luxury and relaxation. With expansive floor-to-ceiling windows, this suite features a spacious living area, a private bedroom with a king-sized bed, and an elegant bathroom with a soaking tub and separate rain shower. Guests can enjoy amenities such as a minibar, premium coffee maker, smart TV, and a high-end sound system. A private balcony overlooks the coastline, making this suite ideal for those seeking a serene and upscale coastal retreat.`,
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
                name: 'Executive Room',
                description: `The Executive Room is designed with business travelers in mind, offering a perfect balance of work and relaxation. This room features a king-sized bed, a spacious work desk with ergonomic seating, and high-speed internet access to ensure productivity. It also includes a flat-screen TV, a minibar, and a coffee machine for added convenience. The modern bathroom is equipped with a rain shower and luxury bath products. Whether you're attending meetings or relaxing after a long day, the Executive Room offers all the comforts needed for a successful and comfortable stay.`,
                capacity: 2,
                bathrooms: 1,
                price: 1300000,
                totalRooms: 10,
                propertyId: createdProperty6.id
            },
        })
        const createdProperty6RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Family Room',
                description: `The Family Room is ideal for families or groups seeking extra space and comfort. This room is thoughtfully designed to accommodate up to four guests, featuring two queen-sized beds and a cozy seating area. The room is equipped with a flat-screen TV, a mini-fridge, and a complimentary tea and coffee station. The spacious bathroom includes a shower and family-friendly amenities. Perfect for family vacations or group getaways, the Family Room ensures a memorable stay with plenty of room to relax and unwind together.`,
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