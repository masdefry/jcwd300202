const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property8 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Pranaya Boutique Hotel',
            country: 'Indonesia',
            address: 'Lengkong Gudang, Serpong District, South Tangerang City, Banten',
            zip_code: '15321',
            city: 'South Tangerang City',
            location: '-6.2962567, 106.6651068',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Offering a spa and wellness center and a restaurant, Pranaya Suites is located in Serpong. Wi-Fi access is available.
                Rooms here will provide you with a flat-screen tv and air conditioning. There is also an electric kettle. 
                Featuring a shower, private bathrooms also come with free toiletries. Extras include a desk and a safety deposit box.
            `,
            neighborhood_description: 'Pranaya Suites is 656 feet’ walk from Teras Kota Mall and is 10 minutes’ drive to The Breeze Lifestyle Center and Mall.',
            phone_number: '+62-595-213-433',
            url: 'https://pranayaboutique.com/',
            total_room: 50,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Luxury',
            rooms: 2,
            capacity: 4,
            bathrooms: 2,
            price: 2300000,
            total_rooms: 10,
            propertyId: 8
        },
        {
            name: 'Executive',
            capacity: 2,
            bathrooms: 1,
            price: 1800000,
            total_rooms: 10,
            propertyId: 8
        },
        {
            name: 'Premium',
            capacity: 2,
            bathrooms: 1,
            price: 1000000,
            total_rooms: 30,
            propertyId: 8
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 8,
            filename: `property_8_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 22,
            filename: `property_8_room_22_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 23,
            filename: `property_8_room_23_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 24,
            filename: `property_8_room_24_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property8HasFacility = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18]
    property8HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 8,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 22,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 7, 10, 13, 15, 16, 17, 18, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 23,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 10, 13, 15, 16, 17, 18, 21, 22]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 24,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })

    console.log(roomHasFacility)
    
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
                propertyId: 8
            }
        })
    
        
        await prisma.propertyRoomType.createMany({
            data: propertyRoomType
        })
        
        const test = await prisma.roomHasFacilities.createMany({
            data: roomHasFacility,
        })
        console.log(test)
        
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

module.exports = { Property8 }