const { PrismaClient, Status, Gender } = require('@prisma/client');
const bcrypt = require('bcrypt')
const { v4 } = require('uuid');
const { Property1 } = require('./property1');
const { Property2 } = require('./property2');
const { Property3 } = require('./property3')
const { Property4 } = require('./property4')
const { Property5 } = require('./property5')
const { Property6 } = require('./property6')
const { Property7 } = require('./property7')
const { Property8 } = require('./property8')
const { Property9 } = require('./property9')
const { Property10 } = require('./property10')
const { Property11 } = require('./property11')
const { Property12 } = require('./property12')
const { Property13 } = require('./property13')
const { Property14 } = require('./property14')
const { Property15 } = require('./property15')
const { Property16 } = require('./property16')
const { Property17 } = require('./property17')
const { Property18 } = require('./property18')
const { Property19 } = require('./property19')
const { Property20 } = require('./property20')

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

const countriesWithCities = [
    {
        name: 'China',
        cities: ['Beijing', 'Hongkong', 'Shenzen', 'Chongqing', 'Wuhan', 'Shanghai', 'Chengdu', 'Nanning', 'Tianjin', 'Nanjing']
    },
    {
        name: 'Indonesia',
        cities: ['Jakarta', 'Surabaya', 'Gianyar Regency', 'Denpasar', 'Bandung', 'Surakarta', 'Tangerang', 'Yogyakarta', 'South Tangerang']
    },
    {
        name: 'Japan',
        cities: ['Osaka', 'Tokyo']
    },
    {
        name: 'Malaysia',
        cities: ['Kuala Lumpur']
    },
    {
        name: 'South Korea',
        cities: ['Seoul', 'Busan', 'Daegu']
    },
    {
        name: 'Thailand',
        cities: ['Bangkok', 'Pattaya']
    },
    {
        name: 'United States of America',
        cities: ['Chicago', 'Los Angeles', 'New York']
    },
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
    'Breakfast'
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

        const country1 = await prisma.country.create({
            data: {
                name: 'Indonesia'
            }
        })
        
        const country2 = await prisma.country.create({
            data: {
                name: 'United States of America'
            }
        })
        
        
        const cities1 = ['Jakarta', 'Surabaya', 'Gianyar Regency', 'Denpasar', 'Bandung', 'Surakarta', 'Tangerang', 'Yogyakarta', 'South Tangerang'];
        const cities1Id = await Promise.all(
        cities1.map(async (item) => {
            const createdCity = await prisma.city.create({
            data: {
                name: item,
                countryId: country1.id,
            },
            });
            return createdCity.id;
        })
        );
        
        const cities2 = ['Chicago', 'Los Angeles', 'New York']
        const cities2Id = await Promise.all(
        cities2.map(async (item) => {
            const createdCity = await prisma.city.create({
            data: {
                name: item,
                countryId: country2.id,
            },
            });
            return createdCity.id;
        })
        );
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

        
        await Property1({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property2({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property3({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property4({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[4].id })
        await Property5({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property6({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[7].id })
        await Property7({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property8({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[9].id })
        await Property9({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property10({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[3].id })
        await Property11({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property12({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[3].id })
        await Property13({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property14({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[2].id })
        await Property15({ tenantAccounts, countryId: country2.id, cityId: await cities1Id[3].id })
        await Property16({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property17({ tenantAccounts, countryId: country2.id, cityId: await cities2Id[2].id })
        await Property18({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })
        await Property19({ tenantAccounts, countryId: country2.id, cityId: await cities2Id[1].id })
        await Property20({ tenantAccounts, countryId: country1.id, cityId: await cities1Id[0].id })

}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
