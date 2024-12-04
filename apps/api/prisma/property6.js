const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property6 ({ tenantAccounts }) {
    const property = [
        {
            name: 'M-Town Residence Gading Serpong by J`s Luxury Apartment',
            country: 'Indonesia',
            address: 'Jl. Gading Serpong Boulevard Blok M5 No.3, Pakulonan Bar., Kec. Cpl. Dua, Tangerang Regency, Banten',
            zip_code: '15810',
            city: 'Tangerang',
            location: '-6.2425476, 106.6296588',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Featuring a garden, M-Town Residence Gading Serpong by J's Luxury Apartment provides accommodations in Tangerang. 
                The air-conditioned accommodation is 6.1 miles from Indonesia Convention Exhibition, and guests can benefit from private parking available on site and free Wifi. 
                The apartment offers an outdoor swimming pool with a fence, as well as a fitness room and an elevator.
            `,
            neighborhood_description: 'Central Park Mall is 16 miles from M-Town Residence Gading Serpong by J`s Luxury Apartment, while Tanah Abang Market is 18 miles away. Soekarno-Hatta International Airport is 8.7 miles from the property.',
            phone_number: '+53-545-233-533',
            url: 'https://jlux.com/id/m-town/',
            total_room: 30,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Ultimate',
            rooms: 2,
            capacity: 4,
            bathrooms: 2,
            price: 2000000,
            total_rooms: 5,
            propertyId: 6
        },
        {
            name: 'Gold',
            capacity: 2,
            bathrooms: 1,
            price: 1300000,
            total_rooms: 10,
            propertyId: 6
        },
        {
            name: 'Silver',
            capacity: 2,
            bathrooms: 1,
            price: 800000,
            total_rooms: 15,
            propertyId: 6
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 6,
            filename: `property_6_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 16,
            filename: `property_6_room_16_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 17,
            filename: `property_6_room_17_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 18,
            filename: `property_6_room_18_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property6HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
    property6HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 6,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    const room_facility_arr = [
        'Smoking Room', 'Non Smoking', 'Pets Allowed', 
        'Children', 'Parties', 'Twin Bed', 
        'Queen Size Bed', 'King Size Bed', 'Bunk Bed Type', 
        'Sofa Bed Type', 'Futon Bed Type', 'Cribs', 
        'Minibar', 'Jacuzzi', 'Bathtub', 
        'Sandals', 'Flat screen TV', 'Safe-deposit Box', 
        'Ironing Center', 'Kitchen', 'Hair Dryer', 
        'Bathroom Amenities', 'Balcony View', 'Private Pool', 
    ]
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 10,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 11,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 10, 13, 15, 16, 17, 18, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 12,
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
                    propertyTypeId: 2,
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
                propertyId: 6
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
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