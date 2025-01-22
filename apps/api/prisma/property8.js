const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property8 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'Pranaya Boutique Hotel',
            address: 'Lengkong Gudang, Serpong District, South Tangerang City, Banten',
            zipCode: '15321',
            location: 'https://maps.app.goo.gl/dBA95YyfpthEWvZ27',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
    const propertyDetail = {
            propertyDescription: `
                Offering a spa and wellness center and a restaurant, Pranaya Suites is located in Serpong. Wi-Fi access is available.
                Rooms here will provide you with a flat-screen tv and air conditioning. There is also an electric kettle. 
                Featuring a shower, private bathrooms also come with free toiletries. Extras include a desk and a safety deposit box.
            `,
            neighborhoodDescription: "Pranaya Suites is 656 feet' walk from Teras Kota Mall and is 10 minutes' drive to The Breeze Lifestyle Center and Mall.",
            phoneNumber: '08595213433',
            url: 'https://pranayaboutique.com/',
            totalRooms: 50,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty8 = await prisma.property.create({
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
                propertyId: createdProperty8.id
            }
        })
    
        const createdProperty8RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Luxury Loft',
                description: `The Luxury Loft offers a unique and spacious design, combining modern elegance with industrial charm. Featuring high ceilings, large windows, and stylish décor, this room includes a comfortable king-sized bed, a separate living area with a sofa, and a work desk. The loft is equipped with premium amenities such as a minibar, espresso machine, smart TV, and high-speed internet access. The expansive bathroom includes a rainfall shower, a soaking tub, and luxury bath products. Perfect for guests looking for an upscale experience with a touch of creativity and space.`,
                rooms: 2,
                capacity: 4,
                bathrooms: 2,
                price: 2300000,
                totalRooms: 10,
                propertyId: createdProperty8.id
            }
        })
        const createdProperty8RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Superior King Room',
                description: `The Superior King Room provides a refined and comfortable retreat with an emphasis on quality and relaxation. This room features a king-sized bed with luxurious linens, a cozy seating area, and a work desk. It's equipped with modern amenities, including a minibar, flat-screen TV, and high-speed internet. The bathroom is designed with elegance, offering a rain shower, premium toiletries, and soft towels. Perfect for solo travelers or couples, the Superior King Room combines modern luxury with a peaceful atmosphere for a restful stay.`,
                capacity: 2,
                bathrooms: 1,
                price: 1800000,
                totalRooms: 10,
                propertyId: createdProperty8.id
            },
        })
        const createdProperty8RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Standard Twin Room',
                description: `The Standard Twin Room is designed to provide comfort and practicality for travelers seeking simplicity and value. It features two single beds, a work desk, and a flat-screen TV. The room also includes essential amenities such as a mini-fridge, tea and coffee-making facilities, and free Wi-Fi. The private bathroom is equipped with a shower and toiletries. Ideal for friends, family members, or business associates, the Standard Twin Room offers a convenient, affordable space to relax and unwind after a day of exploring or work.`,
                capacity: 2,
                bathrooms: 1,
                price: 1000000,
                totalRooms: 30,
                propertyId: createdProperty8.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_8_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty8RoomType1.id,
                filename: `property_8_room_22_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty8RoomType2.id,
                filename: `property_8_room_23_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty8RoomType3.id,
                filename: `property_8_room_24_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property8HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
        property8HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty8.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty8RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty8RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 10, 13, 15, 16, 17, 18, 21, 22]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty8RoomType3.id,
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

module.exports = { Property8 }