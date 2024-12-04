const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property14 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Best Western Papilio Hotel',
            country: 'Indonesia',
            address: 'Jl. Ahmad Yani No.176-178, Gayungan, Gayungan District, Surabaya, East Java',
            zip_code: '60235',
            city: 'Surabaya',
            location: '-7.3311302,112.7273021',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Boasting a rooftop pool overlooking the city, Best Western Papilio Hotel is conveniently located a 3-minute drive away from City of Tomorrow and a 10-minute drive from Surabaya Carnival Night Market. 
                Free WiFi access is available throughout. Staff at the 24-hour front desk can assist with car hire and airport transfers, while the concierge service will be happy to assist with luggage storage. 
                There is also meeting/banqueting facilities and a business centre. After a day of sightseeing guests may enjoy relaxing massage at the spa and wellness centre.
            `,
            neighborhood_description: `
                Best Western Papilio Hotel is a 15-minute drive away from Royal Plaza and a 20-minute drive away from Juanda International Airport.
            `,
            phone_number: '+62-593-999-844',
            url: 'https://bwpapilio.com/',
            total_room: 120,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Special',
            capacity: 2,
            bathrooms: 1,
            price: 800000,
            total_rooms: 20,
            propertyId: 14 
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 650000,
            total_rooms: 40,
            propertyId: 14 
        },
        {
            name: 'Comfort',
            capacity: 2,
            bathrooms: 1,
            price: 445000,
            total_rooms: 60,
            propertyId: 14 
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 14 ,
            filename: `property_14_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 40,
            filename: `property_14_room_40_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 41,
            filename: `property_14_room_41_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 42,
            filename: `property_14_room_42_images_${index + 1}`,
            directory: 'src/public/images'
        }
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
        'Breakfast'
    ]
    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property14HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    property14HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 14,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 40,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 41,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 42,
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
                propertyId: 14
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

module.exports = { Property14 }