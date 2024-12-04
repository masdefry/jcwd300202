const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid');
const { Property1 } = require('./property1');

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

    await prisma.propertyType.createMany({
        data: propertyType
    })
    
    await prisma.propertyFacility.createMany({
        data: propertyFacility
    })

    await prisma.propertyRoomFacility.createMany({
        data: roomFacility
    })

    
    await Property1({ tenantAccounts })
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
