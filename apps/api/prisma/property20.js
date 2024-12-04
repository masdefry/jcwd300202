const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property20 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Whiz Hotel Cikini Jakarta',
            country: 'Indonesia',
            address: 'Jl. Cikini Raya No. 06, RT.13/RW.5, Cikini, Menteng District, Central Jakarta City, Special Capital Region of Jakarta',
            zip_code: '10330',
            city: 'Central Jakarta',
            location: '-6.1883333, 106.8340918',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Situtated within 2.2 km from National Monument, Whiz Hotel Cikini Jakarta offers chic accommodation with free on-site parking. 
                Its modern minimalist-style rooms are brightly lit and fitted with wooden flooring. 
                Free Wi-Fi is accessible throughout the building. 
                Simply yet stylish, air-conditioned rooms come with a flat-screen cable TV, in-room safe and a personal safe. 
                A shower and a set of free toiletries are included in each en suite bathroom.
            `,
            neighborhood_description: `
                Whiz Hotel Cikini Jakarta is 1.9 km from Cikini Train Station, 2.0 km from Hotel Indonesia Roundabout (Bundaran HI) and 39 km from Soekarno-Hatta International Airport.
            `,
            phone_number: '+62-812-671-440',
            url: 'https://www.whizhotels.intiwhiz.com/cikini/',
            total_room: 200,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Deluxe + Breakfast',
            capacity: 2,
            bathrooms: 1,
            price: 500000,
            total_rooms: 30,
            propertyId: 20 
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 470000,
            total_rooms: 40,
            propertyId: 20 
        },
        {
            name: 'Reguler',
            capacity: 2,
            bathrooms: 1,
            price: 395000,
            total_rooms: 70,
            propertyId: 20 
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 20 ,
            filename: `property_20_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 58,
            filename: `property_20_room_58_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 59,
            filename: `property_20_room_59_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 60,
            filename: `property_20_room_60_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property20HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    property20HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 20,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 58,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 59,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 60,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    
    async function main() {
    
        for(let i=0; i < property.length; i++){
            const tenant = tenantAccounts[i % tenantAccounts.length]
            const properties = property[i]
    
            await prisma.property.create({
                data: {
                    name: properties.name,
                    country: properties.country,
                    address: properties.address,
                    zip_code: properties.zip_code,
                    city: properties.city,
                    location: properties.location,
                    checkInStartTime: properties.checkInStartTime,
                    checkInEndTime: properties.checkInEndTime,
                    checkOutStartTime: properties.checkOutStartTime,
                    checkOutEndTime: properties.checkOutEndTime,
                    propertyTypeId: 1,
                    tenantId: tenant.id 
                }
            })
        }
    
        await prisma.propertyDetail.create({
            data: {
                property_description: propertyDetail[0].property_description,
                neighborhood_description: propertyDetail[0].neighborhood_description,
                phone_number: propertyDetail[0].phone_number,
                url: propertyDetail[0].url,
                total_room: propertyDetail[0].total_room,
                propertyId: 20
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
        })
        
        await prisma.roomHasFacilities.createMany({
            data: roomHasFacility,
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