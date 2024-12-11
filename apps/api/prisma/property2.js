const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();


async function Property2 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'Ashley Tugu Tani Menteng',
            country: 'Indonesia',
            address: 'Jl. KH Wahid Hasyim No.4A, RT.7/RW.7, Kb. Sirih, Menteng District, Central Jakarta City, Special Capital Region of Jakarta',
            zipCode: '10350',
            city: 'Jakarta',
            location: '-6.1837852, 106.83133',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
        const propertyDetail = {
                propertyDescription: `
                    Located in Jakarta, a 11-minute walk from Gambir Train Station, Ashley Tugu Tani Menteng provides accommodations with a restaurant, free private parking and a tennis court. 
                    The property is around 1.6 miles from Tanah Abang Market, 1.7 miles from Selamat Datang Monument and 1.8 miles from Grand Indonesia Mall. 
                    The property has a 24-hour front desk, airport transportation, room service and free WiFi throughout the property.
                `,
                neighborhoodDescription: 'Popular points of interest near Ashley Tugu Tani Menteng include National Monument, Sarinah and Istiqlal Grand Mosque. Halim Perdanakusuma International Airport is 16 miles away.',
                phoneNumber: '+1-555-123-4533',
                url: 'https://ashleyhotelgroup.com/id/ashley-tugu-tani/',
                totalRooms: 100,
            }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty2 = await prisma.property.create({
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
                propertyId: createdProperty2.id
            }
        })
    
        const createdProperty2RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Suite',
                description: `The Suite is an elegant and expansive room designed for guests seeking ultimate luxury and privacy. 
                With separate living and sleeping areas, the Suite offers ample space and an enhanced level of comfort. 
                The room is furnished with high-end décor, a king-sized bed, a large sofa, and a work area. 
                Additional amenities include a minibar, a spacious wardrobe, a flat-screen TV, and a state-of-the-art sound system. 
                The lavish bathroom includes a soaking tub, a rain shower, and premium bath products. 
                Perfect for families, business travelers, or those celebrating a special occasion, the Suite provides a luxurious retreat with all the comforts of home and more.`,
                rooms: 2,
                capacity: 4,
                bathrooms: 2,
                price: 4000000,
                totalRooms: 20,
                propertyId: createdProperty2.id
            },
        })
        const createdProperty2RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe',
                description: `The Deluxe Room is perfect for guests seeking a more spacious and luxurious experience. 
                It boasts upgraded furnishings, including a king-sized bed, premium linens, and a cozy sitting area. 
                The room features additional amenities such as a minibar, a coffee machine, and high-speed internet access. 
                The modern bathroom includes a rain shower or bathtub, along with upscale toiletries. 
                Designed for relaxation and comfort, the Deluxe Room is ideal for those wanting extra space and added comfort during their stay.`,
                capacity: 2,
                bathrooms: 1,
                price: 2500000,
                totalRooms: 30,
                propertyId: createdProperty2.id
            },
        })
        const createdProperty2RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Reguler',
                description: `The Reguler Room offers comfort and convenience with essential amenities. 
                Designed for short stays or budget-conscious travelers, it features a comfortable bed, a flat-screen TV, and a work desk. 
                The room is equipped with a private bathroom, complete with toiletries and a shower. 
                Ideal for guests looking for a simple, yet cozy space to rest and recharge, the Reguler Room is perfect for those who need an affordable, no-frills option while exploring the area.`,
                capacity: 2,
                bathrooms: 1,
                price: 1500000,
                totalRooms: 50,
                propertyId: createdProperty2.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_2_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty2RoomType1.id,
                filename: `property_2_room_4_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty2RoomType2.id,
                filename: `property_2_room_5_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty2RoomType3.id,
                filename: `property_2_room_6_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property2HasFacility = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property2HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty2.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 16, 17, 18, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty2RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty2RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty2RoomType3.id,
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

module.exports = { Property2 }