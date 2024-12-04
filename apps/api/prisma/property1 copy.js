const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')

const hashPassword = async(password) => {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

const prisma = new PrismaClient();

const tenants = [
    {
        email: 'john.doe@gmail.com',
        password: 'SecurePass123!'
    },
    {
        email: 'sarah.connor@yahoo.com',
        password: 'Terminator2024#'
    },
    {
        email: 'emily.smith@outlook.com',
        password: 'Password!456'
    }
]

const users = [
    {
        email: 'qwerty@gmail.com',
        password: '12345678'
    },
    {
        email: 'asdfgh@yahoo.com',
        password: '12345678'
    },
    {
        email: 'zxcvbn@outlook.com',
        password: '12345678'
    }
]


const property = [
    {
        name: 'Pan Pacific Jakarta',
        country: 'Indonesia',
        address: 'Thamrin Nine, Luminary Tower Jalan MH Thamrin No 10, Central Jakarta, Jakarta, Special Capital Region of Jakarta',
        zip_code: '10230',
        city: 'Jakarta',
        location: '-6.1980338, 106.8213679,15',
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


const property_facility_arr = [
    'Bar','Club', 'Sauna', 
    'Garden', 'Terrace', 'Hot Tub/ Jacuzzi',
    'Heating', 'Free WiFi', 'Swimming Pool', 
    'Spa', 'Restaurant', 'Parking', 
    '24 Hours Security', 'Valley', 'Electric Car Charging Station', 
    'Shuttle', '24 Hours Minimarket', 'Laundry'
]

const propertyFacility = property_facility_arr.map(item => {
    return {
        name: item
    }
})

const propertyHasFacility = []
const property1HasFacility = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
property1HasFacility.forEach(item => {
    const addedPropertyHasFacility = {
        propertyId: 1,
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
const room1HasFacility = [2, 3, 4, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
room1HasFacility.forEach(item => {
    const addedRoomHasFacility = {
        propertyRoomTypeId: 1,
        propertyRoomFacilityId: item
    }
    roomHasFacility.push(addedRoomHasFacility)
})
const room2HasFacility = [2, 3, 4, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
room2HasFacility.forEach(item => {
    const addedRoomHasFacility = {
        propertyRoomTypeId: 2,
        propertyRoomFacilityId: item
    }
    roomHasFacility.push(addedRoomHasFacility)
})
const room3HasFacility = [2, 4, 6, 15, 16, 17, 18, 19, 21, 22]
room3HasFacility.forEach(item => {
    const addedRoomHasFacility = {
        propertyRoomTypeId: 3,
        propertyRoomFacilityId: item
    }
    roomHasFacility.push(addedRoomHasFacility)
})


const roomFacility = room_facility_arr.map(item => {
    return {
        name: item
    }
})

const propertyType = [
    {
        name: 'Hotel',
        description: 'Traditional accommodation offering rooms and various amenities for travelers.'
    },
    {
        name: 'Apartment',
        description: 'Self-contained unit within a building, offering privacy and home-like amenities.'
    },
    {
        name: 'Villa',
        description: 'Spacious and luxurious standalone property, often with private facilities.'
    },
    {
        name: 'Guesthouse',
        description: 'Smaller, cozy accommodation often run by local hosts.'
    },
    {
        name: 'Bed and Breakfast',
        description: 'Home-like lodging with breakfast included in the stay.'
    },
    {
        name: 'Homestay',
        description: 'Accommodation where guests stay in a host’s home.'
    },
    {
        name: 'Hostel',
        description: 'Budget-friendly lodging with shared rooms and communal spaces.'
    },
    {
        name: 'Condo Hotel',
        description: 'Combination of hotel services and condominium living spaces.'
    },
    {
        name: 'Capsule Hotel',
        description: 'Compact, capsule-shaped sleeping spaces with minimal amenities.'
    },
    {
        name: 'Country House',
        description: 'Rural accommodation with spacious rooms and natural surroundings.'
    },
    {
        name: 'Farm Stay',
        description: 'Lodging on a working farm, often with farm-related activities.'
    },
    {
        name: 'Inn',
        description: 'Small accommodation typically located in rural or suburban areas.'
    },
    {
        name: 'Love Hotel',
        description: 'Private accommodation designed for short stays by couples.'
    },
    {
        name: 'Lodge',
        description: 'Rustic accommodation often located near nature or wildlife areas.'
    },
    {
        name: 'Campground',
        description: 'Outdoor area designated for camping with basic facilities.'
    },
    {
        name: 'Boat',
        description: 'Accommodation on a boat, often stationary or gently moving.'
    },
    {
        name: 'Tent',
        description: 'Temporary shelter for outdoor stays, commonly used in camping.'
    }
]

async function main() {
    const tenantAccounts = []
    for (let tenant of tenants){
        const hashedPassword = await hashPassword(tenant.password)
        const newTenant = await prisma.tenant.create({
            data: {
                email: tenant.email,
                password: hashedPassword
            }
        })
        tenantAccounts.push(newTenant)
    }

    const userAccounts = []
    for (let user of users){
        const hashedPassword = await hashPassword(user.password)
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword
            }
        })
        userAccounts.push(newUser)
    }

    const createdPropertyType = []
    propertyType.forEach(async(item) => {
        const createdPropertyTypeItem = await prisma.propertyType.create({
            data: {
                name: item.name,
                description: item.description
            }
        })

        createdPropertyType.push(createdPropertyTypeItem)
    })
    
    const createdPropertyFacility = []
    propertyFacility.forEach(async(item) => {
        const createdPropertyFacilityItem = await prisma.propertyFacility.create({
            data: {
                name: item.name,
            }
        })

        createdPropertyFacility.push(createdPropertyFacilityItem)
    })

    const createdRoomFacility = []
    roomFacility.forEach(async(item) => {
        const createdRoomFacilityItem = await prisma.propertyRoomFacility.create({
            data: {
                name: item.name,
            }
        })

        createdRoomFacility.push(createdRoomFacilityItem)
    })

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
            propertyId: 1
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


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });