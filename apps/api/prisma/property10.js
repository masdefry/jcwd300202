const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property10 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Heaven Villa Ubud',
        country: 'Indonesia',
        address: 'Jl. Raya Sanggingan, Banjar Lungsiakan, Kedewatan, Ubud, Gianyar Regency, Indonesia',
        zipCode: '80571',
        city: 'Gianyar Regency',
        location: '-8.4847646,115.2511835',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
        propertyDescription: `
        The accommodation is air conditioned and has a flat-screen TV Some units have a seating area and/or balcony. 
        There is also a kitchen, equipped with an oven and microwave. 
        A fridge and stovetop are also featured, as well as a kettle. Bed linen is available.
    `,
        neighborhoodDescription: `
        The property has water sports facilities and bike hire and car hire are available. 
        You can engage in various activities, such as horse riding, windsurfing and diving. 
        Ubud Monkey Forest is 3.7 km from Heaven Villa Ubud, while Elephant Cave is 6 km away. 
        The nearest airport is Ngurah Rai International Airport, 30 km from the property.
    `,
    phoneNumber: '+62-595-213-444',
    url: 'https://www.ubudheaven.com/',
    totalRooms: 4,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty10 = await prisma.property.create({
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
                propertyId: createdProperty10.id
            }
        })
    
        const createdProperty10RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Oceanfront Villa',
                description: `The Oceanfront Villa offers the ultimate in beachfront luxury, providing stunning views of the ocean from every room. This spacious villa features an expansive living area with a plush sofa, a fully equipped kitchen, and a dining area perfect for entertaining. The villa includes two large bedrooms with king-sized beds, each with its own en-suite bathroom featuring a soaking tub and a rain shower. Step outside to a private terrace with a pool, hot tub, and lounge chairs, or take a few steps to the pristine beach. Ideal for those looking to relax and unwind in a serene, tropical environment, the Oceanfront Villa combines elegance, comfort, and breathtaking views.`,
                rooms: 4,
                capacity: 8,
                bathrooms: 4,
                price: 2800000,
                totalRooms: 1,
                propertyId: createdProperty10.id
            }
        })
        const createdProperty10RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Private Garden Villa',
                description: `The Private Garden Villa is a peaceful retreat nestled amidst lush greenery, offering complete privacy and tranquility. This beautifully designed villa features an open-plan living and dining area, a fully equipped kitchen, and two spacious bedrooms with en-suite bathrooms. The master bedroom has a king-sized bed and a luxurious outdoor shower, while the second bedroom has two twin beds. The highlight of this villa is the expansive private garden, complete with a secluded outdoor pool, sunbeds, and shaded seating areas for relaxation. Ideal for nature lovers and those seeking a quiet escape, the Private Garden Villa offers an idyllic blend of luxury and serenity.`,
                rooms: 4,
                capacity: 8,
                bathrooms: 4,
                price: 2700000,
                totalRooms: 1,
                propertyId: createdProperty10.id
            },
        })
        const createdProperty10RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Luxury Hillside Villa',
                description: `The Luxury Hillside Villa is perched on a hill, offering sweeping views of the surrounding mountains and valleys. This modern villa features a large living room with floor-to-ceiling windows, allowing natural light to flood the space. It includes three beautifully designed bedrooms, each with its own private bathroom. The master suite boasts a king-sized bed, a walk-in closet, and a spa-like bathroom with a freestanding tub. The villa also has a fully equipped kitchen, a private infinity pool, and a large outdoor deck with seating and dining areas, perfect for sunset views. Ideal for families or groups, the Luxury Hillside Villa is the perfect blend of modern amenities and stunning natural beauty.`,
                rooms: 3,
                capacity: 6,
                bathrooms: 3,
                price: 1900000,
                totalRooms: 2,
                propertyId: createdProperty10.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_10_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty10RoomType1.id,
                filename: `property_10_room_28_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty10RoomType2.id,
                filename: `property_10_room_29_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty10RoomType3.id,
                filename: `property_10_room_30_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property10HasFacility = [4, 5, 6, 7, 8, 9, 12, 13, 18]
        property10HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty10.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty10RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty10RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty10RoomType3.id,
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

module.exports = { Property10 }