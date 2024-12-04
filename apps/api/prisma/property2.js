const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property2 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Ashley Tugu Tani Menteng',
            country: 'Indonesia',
            address: 'Jl. KH Wahid Hasyim No.4A, RT.7/RW.7, Kb. Sirih, Menteng District, Central Jakarta City, Special Capital Region of Jakarta',
            zip_code: '10350',
            city: 'Jakarta',
            location: '-6.1837852, 106.83133',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Located in Jakarta, a 11-minute walk from Gambir Train Station, Ashley Tugu Tani Menteng provides accommodations with a restaurant, free private parking and a tennis court. 
                The property is around 1.6 miles from Tanah Abang Market, 1.7 miles from Selamat Datang Monument and 1.8 miles from Grand Indonesia Mall. 
                The property has a 24-hour front desk, airport transportation, room service and free WiFi throughout the property.
            `,
            neighborhood_description: 'Popular points of interest near Ashley Tugu Tani Menteng include National Monument, Sarinah and Istiqlal Grand Mosque. Halim Perdanakusuma International Airport is 16 miles away.',
            phone_number: '+1-555-123-4533',
            url: 'https://ashleyhotelgroup.com/id/ashley-tugu-tani/',
            total_room: 100,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Executive',
            rooms: 2,
            capacity: 4,
            bathrooms: 2,
            price: 4000000,
            total_rooms: 20,
            propertyId: 2
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 2500000,
            total_rooms: 30,
            propertyId: 2
        },
        {
            name: 'Reguler',
            capacity: 2,
            bathrooms: 1,
            price: 1500000,
            total_rooms: 50,
            propertyId: 2
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 2,
            filename: `property_2_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 4,
            filename: `property_2_room_4_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 5,
            filename: `property_2_room_5_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 6,
            filename: `property_2_room_6_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property1HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
    property1HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 2,
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
    const room1HasFacility = [2, 3, 4, 8, 10, 13, 14, 15, 16, 17, 18, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 4,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 5,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 6,
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
                propertyId: 2
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
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

module.exports = { Property2 }