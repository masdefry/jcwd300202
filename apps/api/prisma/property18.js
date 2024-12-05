const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property18 ({ tenantAccounts }) {
    const uuid = v4()
    const id = uuid
    const property = {
        name: 'Sotis Residence Pejompongan',
        country: 'Indonesia',
        address: 'Jl. Penjernihan 1 No.10 B 9, RT.9/RW.6, Bend. Hilir, Tanah Abang District, Central Jakarta City, Special Capital Region of Jakarta',
        zipCode: '10210',
        city: 'Central Jakarta',
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
                country: property.country,
                address: property.address,
                zipCode: property.zipCode,
                city: property.city,
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
                name: 'Ultimate',
                capacity: 2,
                bathrooms: 1,
                price: 800000,
                totalRooms: 30,
                propertyId: createdProperty18.id
            }
        })
        const createdProperty18RoomType2 = await prisma.propertyRoomType.create({
            data: {
                name: 'Deluxe',
                capacity: 2,
                bathrooms: 1,
                price: 656000,
                totalRooms: 40,
                propertyId: createdProperty18.id
            },
        })
        const createdProperty18RoomType3 = await prisma.propertyRoomType.create({
            data: {
                name: 'Reguler',
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