const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property13 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'Serenity Park Residences',
            country: 'Indonesia',
            address: 'Jl. Rasuna Said No.35, Kuningan, Setiabudi, South Jakarta, Special Capital Region of Jakarta',
            zipCode: '12950',
            city: 'Jakarta',
            location: '-6.214992, 106.832457',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T22:00:00Z'),
            checkOutStartTime: new Date('2024-12-04T08:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
    const propertyDetail = {
        propertyDescription: `
        Serenity Park Residences offers a luxurious and tranquil living experience in the heart of Jakarta's business district, Kuningan. Designed with modern architecture and lush green landscapes, the property caters to professionals and families looking for both comfort and convenience. Residents can enjoy top-tier amenities such as an Olympic-sized swimming pool, a state-of-the-art fitness center, children's play areas, and private meeting rooms.
        Each unit comes fully furnished with high-end finishes, a spacious open-plan kitchen, a living area, and an en-suite bathroom. With 24-hour security and concierge services, Serenity Park Residences ensure peace of mind and a premium living experience.
        `,
        neighborhoodDescription: `
            Located in the prestigious Kuningan area, Serenity Park Residences provide easy access to Jakarta's key business hubs, upscale shopping malls such as Lotte Shopping Avenue and Plaza Indonesia, and entertainment options. The property is well-connected with nearby MRT and TransJakarta stops, and it's only a 30-minute drive to Soekarno-Hatta International Airport. It's an ideal choice for those who value connectivity and luxury.
        `,
        phoneNumber: '+62-21-567-8910',
        url: 'https://www.serenityparkresidences.com',
        totalRooms: 80,
    }  
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty13 = await prisma.property.create({
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
                propertyId: createdProperty13.id
            }
        })
    
        const createdProperty13RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe Suite',
                description: 'The Deluxe Suite offers a blend of style, comfort, and luxury. Designed with modern interiors and elegant finishes, it features spacious living spaces, a comfortable bedroom, and premium amenities for a relaxing stay. Perfect for couples or small families seeking a touch of sophistication.',
                capacity: 2,
                bathrooms: 1,
                price: 4000000,
                totalRooms: 30, 
                propertyId: createdProperty13.id
            }
        })
        const createdProperty13RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Executive Apartment',
                description: 'The Executive Apartment provides a perfect combination of modern design and convenience, offering ample living space, two bathrooms, and stylish interiors. Ideal for business travelers, families, or groups seeking both functionality and style during their stay.',
                capacity: 4,
                bathrooms: 2,
                price: 6000000,
                totalRooms: 30,
                propertyId: createdProperty13.id
            },
        })
        const createdProperty13RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Skyline Penthouse',
                description: 'The Skyline Penthouse is a luxurious retreat with breathtaking views and premium features. Boasting three spacious bedrooms, three modern bathrooms, and elegant interiors, it offers unmatched comfort and style. Perfect for families or groups looking for a high-end experience with panoramic city views.',
                rooms: 3,
                capacity: 8,
                bathrooms: 3,
                price: 15000000,
                totalRooms: 20,
                propertyId: createdProperty13.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_13_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty13RoomType1.id,
                filename: `property_13_room_37_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty13RoomType2.id,
                filename: `property_13_room_38_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty13RoomType3.id,
                filename: `property_13_room_39_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property13HasFacility = [1, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
        property13HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty13.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 3, 7, 13, 17, 20, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty13RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 3, 4, 5, 8, 13, 15, 17, 20, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty13RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 3, 4, 5, 8, 13, 14, 15, 17, 18, 19, 20, 23, 24, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty13RoomType3.id,
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

module.exports = { Property13 }

