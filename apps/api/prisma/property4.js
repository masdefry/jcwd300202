const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property4 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
            name: 'Apartemen Tera Residence',
            address: 'Jl. Tera No.28, Braga, Sumur Bandung District, Bandung City, West Java',
            zipCode: '40111',
            location: '-6.9159208, 107.6100328',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
    }
    
    const propertyDetail = {
            propertyDescription: `
                Offering an infinity pool and an indoor pool, Apartemen Tera Residence in Bandung is close to Bandung Train Station and St. Peter's Cathedral Bandung. 
                The air-conditioned accommodations are a 7-minute walk from Braga City Walk, and guests can benefit from private parking available on site and free Wifi. 
                All rooms are equipped with a balcony with city views.
            `,
            neighborhoodDescription: 'Gedung Sate is 1.7 miles from the apartment, while Trans Studio Bandung is 2.3 miles away. The nearest airport is Husein Sastranegara International Airport, 3.1 miles from Apartemen Tera Residence.',
            phoneNumber: '+13-545-123-4333',
            url: 'https://www.tamansariteraresidence.com/',
            totalRooms: 120,
        }
    
    

    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty4 = await prisma.property.create({
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
                propertyId: createdProperty4.id
            }
        })
        
        
        const createdProperty4RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Penthouse Suite',
                description: `The Penthouse Suite is the epitome of luxury and sophistication, offering panoramic views of the city or surrounding landscape. This spacious suite features a separate living area, a private bedroom with a king-sized bed, and a lavish bathroom with a Jacuzzi and rain shower. The suite is equipped with top-tier amenities, including a minibar, a Nespresso machine, a smart TV, and a sound system. Guests can enjoy exclusive access to a private terrace or balcony, ideal for unwinding in style. Perfect for those seeking an extravagant escape or a memorable special occasion.`,
                rooms: 3,
                capacity: 6,
                bathrooms: 3,
                price: 5000000,
                totalRooms: 20,
                propertyId: createdProperty4.id
            },
        })
        const createdProperty4RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Garden View Deluxe',
                description: `The Garden View Deluxe Room offers a tranquil retreat with beautiful views of the hotel’s lush gardens. This room is elegantly furnished with a king-sized bed, plush linens, and a cozy seating area. It also includes a minibar, coffee machine, and a flat-screen TV. The modern bathroom is designed with a spacious rain shower and high-quality toiletries. With a peaceful ambiance, this room is ideal for those looking for comfort and a serene atmosphere while being surrounded by nature, offering the perfect balance of luxury and tranquility.`,
                rooms: 2,
                capacity: 4,
                bathrooms: 2,
                price: 3800000,
                totalRooms: 50,
                propertyId: createdProperty4.id
            },
        })
        const createdProperty4RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Cozy Queen Room',
                description: `The Cozy Queen Room is designed for guests who appreciate a warm and inviting space with all the essentials for a comfortable stay. It features a queen-sized bed with soft linens, a work desk, and a flat-screen TV. The room also includes a mini-fridge, complimentary tea and coffee-making facilities, and free high-speed internet. The private bathroom is equipped with a shower and essential toiletries. Ideal for solo travelers or couples looking for an affordable, yet comfortable option, the Cozy Queen Room offers great value without compromising on quality.`,
                capacity: 2,
                bathrooms: 1,
                price: 1600000,
                totalRooms: 50,
                propertyId: createdProperty4.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_4_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty4RoomType1.id,
                filename: `property_4_room_10_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty4RoomType2.id,
                filename: `property_4_room_11_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty4RoomType3.id,
                filename: `property_4_room_12_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })

        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

        const propertyHasFacility = []
        const property4HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
        property4HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty4.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
        
        const roomHasFacility = []
        const room1HasFacility = [1, 2, 3, 4, 8, 10, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty4RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [1, 2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty4RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [1, 2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty4RoomType3.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        
        await prisma.roomHasFacilities.createMany({
            data: roomHasFacility,
            skipDuplicates: true,
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

module.exports = { Property4 }