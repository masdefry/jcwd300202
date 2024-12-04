const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property4 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Apartemen Tera Residence',
            country: 'Indonesia',
            address: 'Jl. Tera No.28, Braga, Sumur Bandung District, Bandung City, West Java',
            zip_code: '40111',
            city: 'Bandung',
            location: '-6.9159208, 107.6100328',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Offering an infinity pool and an indoor pool, Apartemen Tera Residence in Bandung is close to Bandung Train Station and St. Peter's Cathedral Bandung. 
                The air-conditioned accommodations are a 7-minute walk from Braga City Walk, and guests can benefit from private parking available on site and free Wifi. 
                All rooms are equipped with a balcony with city views.
            `,
            neighborhood_description: 'Gedung Sate is 1.7 miles from the apartment, while Trans Studio Bandung is 2.3 miles away. The nearest airport is Husein Sastranegara International Airport, 3.1 miles from Apartemen Tera Residence.',
            phone_number: '+13-545-123-4333',
            url: 'https://www.tamansariteraresidence.com/',
            total_room: 120,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'First',
            rooms: 3,
            capacity: 6,
            bathrooms: 3,
            price: 5000000,
            total_rooms: 20,
            propertyId: 4
        },
        {
            name: 'Extra',
            rooms: 2,
            capacity: 4,
            bathrooms: 2,
            price: 3800000,
            total_rooms: 50,
            propertyId: 4
        },
        {
            name: 'Compact',
            capacity: 2,
            bathrooms: 1,
            price: 1600000,
            total_rooms: 50,
            propertyId: 4
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 4,
            filename: `property_4_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 10,
            filename: `property_4_room_10_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 11,
            filename: `property_4_room_11_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 12,
            filename: `property_4_room_12_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property4HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
    property4HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 4,
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
    const room1HasFacility = [1, 2, 3, 4, 8, 10, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 10,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [1, 2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 11,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [1, 2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
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
                propertyId: 4
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
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