const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property16 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Grand Whiz Poins Simatupang Jakarta',
            country: 'Indonesia',
            address: 'Simatupang, Jl. R.A. Kartini No.1, Lb. Bulus, Cilandak District, Jakarta, Special Capital Region of Jakarta',
            zip_code: '12440',
            city: 'South Jakarta',
            location: '-6.2899462, 106.7755765',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Located in Jakarta, 5 km from Kemang, Grand Whiz Poins Square offers accommodation with an outdoor pool. 
                It provides a 24-hour front desk and free WiFi access throughout the premises.
                Rooms at Grand Whiz Poins Square are equipped with air conditioning and a flat-screen cable TV. 
                For convenience, a personal safe and an electric kettle are provided in each room. The private bathroom comes with a shower and free toiletries.
            `,
            neighborhood_description: `
                Ragunan Zoo is 5 km from Grand Whiz Poins Square, while Bundaran HI is 12 km from the property. The nearest airport is Halim Perdanakusuma Airport, 12 km from Grand Whiz Poins Square.
            `,
            phone_number: '+62-313-943-122',
            url: 'https://grandwhiz.intiwhiz.com/poinssimatupang/home.php',
            total_room: 160,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Superior',
            capacity: 2,
            bathrooms: 1,
            price: 760000,
            total_rooms: 30,
            propertyId: 16 
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 566000,
            total_rooms: 40,
            propertyId: 16 
        },
        {
            name: 'Reguler',
            capacity: 2,
            bathrooms: 1,
            price: 431000,
            total_rooms: 90,
            propertyId: 16 
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 16 ,
            filename: `property_16_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 46,
            filename: `property_16_room_46_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 47,
            filename: `property_16_room_47_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 48,
            filename: `property_16_room_48_images_${index + 1}`,
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
    const property16HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    property16HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 16,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 46,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 47,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 48,
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
                propertyId: 16
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

module.exports = { Property16 }