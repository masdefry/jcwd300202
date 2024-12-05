const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

async function Property1 ({ tenantAccounts, tx }) {
    const property = [
        {
            name: 'Pan Pacific Jakarta',
            country: 'Indonesia',
            address: 'Thamrin Nine, Luminary Tower Jalan MH Thamrin No 10, Central Jakarta, Jakarta, Special Capital Region of Jakarta',
            zip_code: '10230',
            city: 'Jakarta',
            location: '-6.1980338, 106.8213679',
            checkInStartTime: new Date('2024-12-03T15:00:00Z'),
            checkInEndTime: new Date('2024-12-03T23:59:00Z'),
            checkOutStartTime: new Date('2024-12-04T06:00:00Z'),
            checkOutEndTime: new Date('2024-12-04T12:00:00Z'),
        }
    ]
    
    const propertyDetail = [
        {
            property_description: `
                Located in Jakarta, a 8-minute walk from Selamat Datang Monument, Pan Pacific Jakarta has accommodations with a restaurant, free private parking and a bar. Each room at the 5-star hotel has city views, and guests can enjoy access to an indoor pool. The property provides a 24-hour front desk, airport transportation, room service and free WiFi throughout the property.
                The hotel will provide guests with air-conditioned rooms offering a desk, a coffee machine, a minibar, a safety deposit box, a flat-screen TV and a private bathroom with a shower. At Pan Pacific Jakarta the rooms come with bed linen and towels.
                The daily breakfast offers buffet, continental or Asian options.
            `,
            neighborhood_description: 'Popular points of interest near the accommodation include Grand Indonesia Mall, Sarinah and Tanah Abang Market. Halim Perdanakusuma International Airport is 15 miles from the property.',
            phone_number: '+1-555-123-4567',
            url: 'https://www.panpacific.com',
            total_room: 100,
        }
    ]
    
    
    const propertyRoomType = [
        {
            name: 'Suite',
            rooms: 3,
            capacity: 6,
            bathrooms: 2,
            price: 8000000,
            total_rooms: 30,
            propertyId: 1
        },
        {
            name: 'Premiere',
            capacity: 4,
            bathrooms: 1,
            price: 4500000,
            total_rooms: 30,
            propertyId: 1
        },
        {
            name: 'Deluxe',
            capacity: 2,
            bathrooms: 1,
            price: 2500000,
            total_rooms: 40,
            propertyId: 1
        }
    ]
    
    const propertyImages = Array.from({length: 5}).map((_,index) => {
        return {
            propertyDetailId: 1,
            filename: `property_1_images_${index + 1}`,
            directory: 'src/public/images'
        }
    }) 

    const room1Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 1,
            filename: `property_1_room_1_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room2Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 2,
            filename: `property_1_room_2_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })
    const room3Images = Array.from({length: 3}).map((_,index) => {
        return {
            propertyRoomTypeId: 3,
            filename: `property_1_room_3_images_${index + 1}`,
            directory: 'src/public/images'
        }
    })

    const propertyRoomImages = [...room1Images, ...room2Images, ...room3Images]

    const propertyHasFacility = []
    const property1HasFacility = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    property1HasFacility.forEach(item => {
        const addedPropertyHasFacility = {
            propertyId: 1,
            propertyFacilityId: item
        }
        propertyHasFacility.push(addedPropertyHasFacility)
    })

    const roomHasFacility = []
    const room1HasFacility = [2, 3, 4, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    room1HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 1,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room2HasFacility = [2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    room2HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 2,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    const room3HasFacility = [2, 4, 6, 15, 16, 17, 18, 19, 21, 22, 25]
    room3HasFacility.forEach(item => {
        const addedRoomHasFacility = {
            propertyRoomTypeId: 3,
            propertyRoomFacilityId: item
        }
        roomHasFacility.push(addedRoomHasFacility)
    })
    
    async function main({tx, tenantAccounts, property}) {
        try {
            await prisma.$transaction(async (tx) => {
                for (let i = 0; i < property.length; i++) {
                    const tenant = tenantAccounts[i % tenantAccounts.length];
                    const properties = property[i];
    
                    await tx.property.create({
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
                            tenantId: tenant.id,
                        },
                    });
                }
    
                await tx.propertyDetail.create({
                    data: {
                        property_description: propertyDetail[0].property_description,
                        neighborhood_description: propertyDetail[0].neighborhood_description,
                        phone_number: propertyDetail[0].phone_number,
                        url: propertyDetail[0].url,
                        total_room: propertyDetail[0].total_room,
                        propertyId: 1,
                    },
                });
    
                await tx.propertyRoomType.createMany({
                    data: propertyRoomType,
                });
    
                await tx.roomHasFacilities.createMany({
                    data: roomHasFacility,
                });
    
                await tx.propertyHasFacility.createMany({
                    data: propertyHasFacility,
                });
    
                await tx.propertyImage.createMany({
                    data: propertyImages,
                });
    
                await tx.propertyRoomImage.createMany({
                    data: propertyRoomImages,
                });
            }, {
                maxWait: 1800000,
                timeout: 3600000,
            });
    
            console.log("Transaction completed successfully.");
        } catch (error) {
            console.error("Error during transaction:", error);
        }
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

module.exports = { Property1 }