const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property18 ({ tenantAccounts }) {
    const property = [
        {
            name: 'Sotis Residence Pejompongan',
            country: 'Indonesia',
            address: 'Jl. Penjernihan 1 No.10 B 9, RT.9/RW.6, Bend. Hilir, Tanah Abang District, Central Jakarta City, Special Capital Region of Jakarta',
            zip_code: '10210',
            city: 'Central Jakarta',
            location: '-6.2036277, 106.8033332',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Featuring free WiFi, a restaurant and a terrace, Sotis Residence Pejompongan offers accommodation in Jakarta, 1.7 km from Tanah Abang Grocery & Textile Center. 
                Gelora Bung Karno's Main Gate is 5.4 km away. Guests can enjoy the on-site bar.
                All rooms are air-conditioned and each has a flat-screen TV. 
                Guests enjoy a private bathroom equipped with a shower.
            `,
            neighborhood_description: `
                Bundaran HI is 1.7 km from Sotis Residence Pejompongan, while Sarinah is 2.3 km from the property. Halim Perdanakusuma Airport is 11 km away.
            `,
            phone_number: '+62-776-521-445',
            url: 'https://www.sotishotels.com/hotel/view/4/sotis-residence-pejompongan',
            total_room: 140,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Ultimate',
            capacity: 2,
            bathrooms: 1,
            price: 800000,
            total_rooms: 30,
            propertyId: 18 
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 656000,
            total_rooms: 40,
            propertyId: 18 
        },
        {
            name: 'Reguler',
            capacity: 2,
            bathrooms: 1,
            price: 500000,
            total_rooms: 70,
            propertyId: 18 
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 18 ,
            filename: `property_18_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 52,
            filename: `property_18_room_52_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 53,
            filename: `property_18_room_53_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 54,
            filename: `property_18_room_54_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property18HasFacility = [4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    property18HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 18,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })
    
    const roomHasFacility = []
    const room1HasFacility = [2, 4, 7, 15, 16, 17, 18, 21, 22, 23, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 52,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 4, 6, 15, 16, 17, 18, 21, 22, 23, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 53,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 16, 17, 18, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 54,
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
                propertyId: 18
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

module.exports = { Property18 }