const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property18 ({ tenantAccounts, countryId, cityId }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Sotis Residence Pejompongan',
        address: 'Jl. Penjernihan 1 No.10 B 9, RT.9/RW.6, Bend. Hilir, Tanah Abang District, Central Jakarta City, Special Capital Region of Jakarta',
        zipCode: '10210',
        location: '-6.2036277, 106.8033332',
        checkInStartTime: new Date('2024-12-03T15:00:00Z'),
        checkInEndTime: new Date('2024-12-03T23:59:00Z'),
        checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
        checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    
    const propertyDetail = {
        propertyDescription: `
        Featuring free WiFi, a restaurant and a terrace, Sotis Residence Pejompongan offers accommodation in Jakarta, 1.7 km from Tanah Abang Grocery & Textile Center. 
        Gelora Bung Karno's Main Gate is 5.4 km away. Guests can enjoy the on-site bar.
        All rooms are air-conditioned and each has a flat-screen TV. 
        Guests enjoy a private bathroom equipped with a shower.
        `,
        neighborhoodDescription: `
            Bundaran HI is 1.7 km from Sotis Residence Pejompongan, while Sarinah is 2.3 km from the property. Halim Perdanakusuma Airport is 11 km away.
        `,
        phoneNumber: '+62-776-521-445',
        url: 'https://www.sotishotels.com/hotel/view/4/sotis-residence-pejompongan',
        totalRooms: 140,
    }
    
    async function main() {
        const tenantIndex = Math.floor(Math.random() * 3)
        const tenant = tenantAccounts[tenantIndex]

        const createdProperty18 = await prisma.property.create({
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
                propertyId: createdProperty18.id
            }
        })
    
        const createdProperty18RoomType1 = await prisma.propertyRoomType.create({
            data: {
                name: 'Signature Suite',
                description: `The Signature Suite offers an elevated, luxurious experience with expansive space and thoughtful design. This suite features a large living area with a plush sofa, a work desk, and a dining area, along with a private bedroom that includes a king-sized bed with premium linens. Guests can enjoy top-of-the-line amenities, such as a minibar, a Nespresso machine, a smart TV, and high-speed internet access. The opulent bathroom includes a soaking tub, a rain shower, and luxury bath products. With its sophisticated design and premium amenities, the Signature Suite is perfect for guests who seek elegance and comfort in a spacious setting.`,
                capacity: 2,
                bathrooms: 1,
                price: 800000,
                totalRooms: 30,
                propertyId: createdProperty18.id
            }
        })
        const createdProperty18RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Junior Suite',
                description: `The Junior Suite combines comfort and extra space with a stylish and modern design. This suite features a spacious bedroom with a king-sized bed, a sitting area with a sofa, and a work desk. It includes high-end amenities such as a flat-screen TV, a minibar, and a coffee machine. The en-suite bathroom offers a walk-in shower, a vanity area, and upscale toiletries. With its additional space and luxurious touches, the Junior Suite is perfect for those looking for a more spacious and comfortable stay with the added benefits of extra room to relax.`,
                capacity: 2,
                bathrooms: 1,
                price: 656000,
                totalRooms: 40,
                propertyId: createdProperty18.id
            },
        })
        const createdProperty18RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Classic Room',
                description: `The Classic Room offers a timeless and cozy stay for those seeking a simple, yet comfortable environment. This room features a queen-sized bed with soft linens, a work desk, and a flat-screen TV. A mini-fridge and tea and coffee-making facilities are provided for convenience. The private bathroom is equipped with a shower, complimentary toiletries, and fresh towels. Ideal for solo travelers or couples, the Classic Room provides a relaxing and affordable space to unwind after a day of exploring or business.`,
                capacity: 2,
                bathrooms: 1,
                price: 500000,
                totalRooms: 70,
                propertyId: createdProperty18.id
            }
        })
        
        const propertyImages = Array.from({length: 5}).map((_,index) => {
            return {
                propertyDetailId: createdPropertyDetail.id,
                filename: `property_18_images_${index + 1}`,
                directory: 'src/public/images'
            }
        }) 

        
        const room1Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty18RoomType1.id,
                filename: `property_18_room_52_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room2Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty18RoomType2.id,
                filename: `property_18_room_53_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
        const room3Images = Array.from({length: 3}).map((_,index) => {
            return {
                propertyRoomTypeId: createdProperty18RoomType3.id,
                filename: `property_18_room_54_images_${index + 1}`,
                directory: 'src/public/images'
            }
        })
    
        const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]
    
        const propertyHasFacility = []
        const property18HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        property18HasFacility.forEach(item => {
            const addedPropertyHasFacility = {
                propertyId: createdProperty18.id,
                propertyFacilityId: item
            }
            propertyHasFacility.push(addedPropertyHasFacility)
        })
    
        const roomHasFacility = []
        const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
        room1HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty18RoomType1.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
        room2HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty18RoomType2.id,
                propertyRoomFacilityId: item
            }
            roomHasFacility.push(addedRoomHasFacility)
        })
        const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
        room3HasFacility.forEach(item => {
            const addedRoomHasFacility = {
                propertyRoomTypeId: createdProperty18RoomType3.id,
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

module.exports = { Property18 }