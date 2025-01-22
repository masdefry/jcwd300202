const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property20 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Whiz Hotel Cikini Jakarta',
        address: 'Jl. Cikini Raya No. 06, RT.13/RW.5, Cikini, Menteng District, Central Jakarta City, Special Capital Region of Jakarta',
        zipCode: '10330',
        location: 'https://maps.app.goo.gl/BBcyTs3HAmbY7Fsf9',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        Situtated within 2.2 km from National Monument, Whiz Hotel Cikini Jakarta offers chic accommodation with free on-site parking. 
        Its modern minimalist-style rooms are brightly lit and fitted with wooden flooring. 
        Free Wi-Fi is accessible throughout the building. 
        Simply yet stylish, air-conditioned rooms come with a flat-screen cable TV, in-room safe and a personal safe. 
        A shower and a set of free toiletries are included in each en suite bathroom.
        `,
        neighborhoodDescription: `
            Whiz Hotel Cikini Jakarta is 1.9 km from Cikini Train Station, 2.0 km from Hotel Indonesia Roundabout (Bundaran HI) and 39 km from Soekarno-Hatta International Airport.
        `,
        phoneNumber: '0812671440',
        url: 'https://www.whizhotels.intiwhiz.com/cikini/',
        totalRooms: 200,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty20 = await prisma.property.create({
            data: {
                id,
                name: property.name,
                countryId,
                address: property.address,
                zipCode: property.zipCode,
                cityId,
                star: 3,
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
                propertyId: createdProperty20.id
            }
        })
    
        const createdProperty20RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Standard Room (With Breakfast)',
                description: `The Standard Room offers great value for guests who want both comfort and convenience, with the added bonus of breakfast included. This room features a comfortable double or twin bed, a flat-screen TV, and a cozy seating area. The room also includes essential amenities like a mini-fridge, a work desk, and a coffee machine. The private bathroom is equipped with a shower and complimentary toiletries. Guests can enjoy a complimentary breakfast to start their day right. The Standard Room is a great choice for both short and extended stays, offering comfort and savings in a budget-friendly package.`,
                capacity: 2,
                bathrooms: 1,
                price: 500000,
                totalRooms: 30,
                propertyId: createdProperty20.id
            }
        })
        const createdProperty20RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Basic Twin Room (Without Breakfast)',
                description: `The Basic Twin Room is an affordable option for travelers seeking a no-frills stay. This room features two single beds, a flat-screen TV, and a small table for convenience. The room is equipped with a mini-fridge, free Wi-Fi, and a work desk. The private bathroom comes with a shower and basic amenities. While breakfast is not included, the hotel is conveniently located near local cafés and restaurants. The Basic Twin Room is ideal for guests looking for a simple and affordable place to stay, with everything you need for a restful night.`,
                capacity: 2,
                bathrooms: 1,
                price: 470000,
                totalRooms: 40,
                propertyId: createdProperty20.id
            },
        })
        const createdProperty20RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Economy Room (Without Breakfast)',
                description: `The Economy Room is the perfect choice for budget-conscious travelers looking for comfort at an affordable price. This simple yet cozy room features a comfortable double bed, a flat-screen TV, a work desk, and a small closet for storage. Amenities include complimentary Wi-Fi, a mini-fridge, and a coffee maker for convenience. The private bathroom comes with a shower and basic toiletries. This room is ideal for short stays or those who just need a place to rest after a day of sightseeing or business, offering great value without the extra frills.`,
                capacity: 2,
                bathrooms: 1,
                price: 395000,
                totalRooms: 70,
                propertyId: createdProperty20.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_20_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty20RoomType1.id,
                filename: `property_20_room_58_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty20RoomType2.id,
                filename: `property_20_room_59_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty20RoomType3.id,
                filename: `property_20_room_60_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property20HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property20HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty20.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty20RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty20RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty20RoomType3.id,
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

module.exports = { Property20 }
