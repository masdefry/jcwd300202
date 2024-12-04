const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property12 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Juli House by Mahaputra',
            country: 'Indonesia',
            address: '27 Jl. Bisma, Downtown, Ubud,',
            zip_code: '80582',
            city: 'Gianyar Regency',
            location: '-8.5082263,115.2563687',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Situated in the centre of Ubud, Juli House by Mahaputra has an outdoor swimming pool, a garden, free WiFi, and free private parking for guests who drive. 
                This guest house features air-conditioned accommodation with a terrace. 
                The accommodation offers a 24-hour front desk, full-day security and organising tours for guests.
            `,
            neighborhood_description: `
                The nearest airport is Ngurah Rai International Airport, 36 km from Juli House by Mahaputra.
            `,
            phone_number: '+62-593-113-444',
            url: 'https://mahaputrahotelsandresorts.com/property/juli-house/',
            total_room: 10,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'X-Large',
            capacity: 2,
            bathrooms: 1,
            price: 1000000,
            total_rooms: 2,
            propertyId: 12
        },
        {
            name: 'Medium',
            capacity: 2,
            bathrooms: 1,
            price: 750000,
            total_rooms: 4,
            propertyId: 12
        },
        {
            name: 'Compact',
            capacity: 2,
            bathrooms: 1,
            price: 490000,
            total_rooms: 4,
            propertyId: 12
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 12,
            filename: `property_12_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 34,
            filename: `property_12_room_34_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 35,
            filename: `property_12_room_35_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 36,
            filename: `property_12_room_36_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const property_facility_arr = [
        'Bar','Club', 'Sauna', 
        'Garden', 'Terrace', 'Hot Tub/ Jacuzzi',
        'Heating', 'Free WiFi', 'Swimming Pool', 
        'Spa', 'Restaurant', 'Parking', 
        '24 Hours Security', 'Valley', 'Electric Car Charging Station', 
        'Shuttle', '24 Hours Minimarket', 'Laundry'
    ]
    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property12HasFacility = [8, 9, 12, 18]
    property12HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 12,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 34,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 35,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 15, 17, 18, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 36,
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
                    propertyTypeId: 4,
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
                propertyId: 12
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

module.exports = { Property12 }