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
        password: 'SecurePass123',
    },
    {
        email: 'sarah.connor@yahoo.com',
        password: 'Terminator2024#'
    },
    {
        email: 'emily.smith@outlook.com',
        password: 'Password456'
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

// const countriesWithCities = [
//     {
//         name: 'China',
//         cities: ['Beijing', 'Hongkong', 'Shenzen', 'Chongqing', 'Wuhan', 'Shanghai', 'Chengdu', 'Nanning', 'Tianjin', 'Nanjing']
//     },
//     {
//         name: 'Indonesia',
//         cities: ['Jakarta', 'Surabaya', 'Gianyar Regency', 'Denpasar', 'Bandung', 'Surakarta', 'Tangerang', 'Yogyakarta', 'South Tangerang']
//     },
//     {
//         name: 'Japan',
//         cities: ['Osaka', 'Tokyo']
//     },
//     {
//         name: 'Malaysia',
//         cities: ['Kuala Lumpur']
//     },
//     {
//         name: 'South Korea',
//         cities: ['Seoul', 'Busan', 'Daegu']
//     },
//     {
//         name: 'Thailand',
//         cities: ['Bangkok', 'Pattaya']
//     },
//     {
//         name: 'United States of America',
//         cities: ['Chicago', 'Los Angeles', 'New York']
//     },
// ]



const property_facility_arr = [
    { iconFilename: 'property_', name: "Bar" },
    { iconFilename: 'property_', name: "Club" },
    { iconFilename: 'property_', name: "Sauna" },
    { iconFilename: 'property_', name: "Garden" },
    { iconFilename: 'property_', name: "Terrace" },
    { iconFilename: 'property_', name: "Hot Tub/ Jacuzzi" },
    { iconFilename: 'property_', name: "Heating" },
    { iconFilename: 'property_', name: "Free WiFi" },
    { iconFilename: 'property_', name: "Swimming Pool" },
    { iconFilename: 'property_', name: "Spa" },
    { iconFilename: 'property_', name: "Restaurant" },
    { iconFilename: 'property_', name: "Parking" },
    { iconFilename: 'property_', name: "24 Hours Security" },
    { iconFilename: 'property_', name: "Valley" },
    { iconFilename: 'property_', name: "Electric Car Charging Station" },
    { iconFilename: 'property_', name: "Shuttle" },
    { iconFilename: 'property_', name: "24 Hours Minimarket" },
    { iconFilename: 'property_', name: "Laundry" }
]

const propertyFacility = property_facility_arr.map((item, index) => {
    return {
        name: item.name,
        iconDirectory: 'src/public/images',
        iconFilename: item.iconFilename + `${index + 1}`
    }
})


const room_facility_arr = [
    { iconFilename: 'room_', name: "Smoking Room" },
    { iconFilename: 'room_', name: "Non Smoking" },
    { iconFilename: 'room_', name: "Pets Allowed" },
    { iconFilename: 'room_', name: "Children" },
    { iconFilename: 'room_', name: "Parties" },
    { iconFilename: 'room_', name: "Twin Bed" },
    { iconFilename: 'room_', name: "Queen Size Bed" },
    { iconFilename: 'room_', name: "King Size Bed" },
    { iconFilename: 'room_', name: "Bunk Bed Type" },
    { iconFilename: 'room_', name: "Sofa Bed Type" },
    { iconFilename: 'room_', name: "Futon Bed Type" },
    { iconFilename: 'room_', name: "Cribs" },
    { iconFilename: 'room_', name: "Minibar" },
    { iconFilename: 'room_', name: "Jacuzzi" },
    { iconFilename: 'room_', name: "Bathtub" },
    { iconFilename: 'room_', name: "Sandals" },
    { iconFilename: 'room_', name: "Flat screen TV" },
    { iconFilename: 'room_', name: "Safe-deposit Box" },
    { iconFilename: 'room_', name: "Ironing Center" },
    { iconFilename: 'room_', name: "Kitchen" },
    { iconFilename: 'room_', name: "Hair Dryer" },
    { iconFilename: 'room_', name: "Bathroom Amenities" },
    { iconFilename: 'room_', name: "Balcony View" },
    { iconFilename: 'room_', name: "Private Pool" },
    { iconFilename: 'room_', name: "Breakfast" }
]


const roomFacility = room_facility_arr.map((item, index) => {
    return {
        name: item.name,
        iconDirectory: 'src/public/images',
        iconFilename: item.iconFilename + `${index + 1}`
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
    
        const test = await prisma.propertyType.createMany({
            data: propertyType
        })
        console.log(">>>>>")
        console.log(test)
    
        const country1 = await prisma.country.create({
            data: {
                name: 'Indonesia',
                description: ' A World of Natural Beauty and Culture',
                filename: 'indonesia',
                directory: 'src/public/images'
            }
        })
        
        const country2 = await prisma.country.create({
            data: {
                name: 'United States of America',
                description: 'Experience Freedom, Embrace Opportunity',
                filename: 'usa',
                directory: 'src/public/images'
            }
        })
        
        
        const cities1 = ['Jakarta', 'Surabaya', 'Gianyar', 'Denpasar', 'Bandung', 'Surakarta', 'Tangerang', 'Yogyakarta', 'South Tangerang'];
        const cities1Id = await Promise.all(
        cities1.map(async (item) => {
            const createdCity = await prisma.city.create({
            data: {
                name: item,
                countryId: country1.id,
                directory: 'src/public/images',
                filename: `indonesia_${item.toLowerCase().split(' ').join('_')}`
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
                directory: 'src/public/images',
                filename: `usa_${item.toLowerCase().split(' ').join('_')}`
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

        console.log("ini citiesss")
        console.log(cities1Id[0])
        console.log(await cities1Id[0])
        
        await prisma.propertyFacility.createMany({
            data: propertyFacility
        })

        await prisma.propertyRoomFacility.createMany({
            data: roomFacility
        })

        
        setTimeout(async() => {

            await Property1({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0] })
            await Property2({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property3({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property4({ tenantAccounts, countryId: country1.id, cityId: cities1Id[4]})
            await Property5({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property6({ tenantAccounts, countryId: country1.id, cityId: cities1Id[6]})
            await Property7({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property8({ tenantAccounts, countryId: country1.id, cityId: cities1Id[8]})
            await Property9({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property10({ tenantAccounts, countryId: country1.id, cityId: cities1Id[2]})
            await Property11({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property12({ tenantAccounts, countryId: country1.id, cityId: cities1Id[2]})
            await Property13({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property14({ tenantAccounts, countryId: country1.id, cityId: cities1Id[1]})
            await Property15({ tenantAccounts, countryId: country2.id, cityId: cities1Id[2]})
            await Property16({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property17({ tenantAccounts, countryId: country2.id, cityId: cities2Id[2]})
            await Property18({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
            await Property19({ tenantAccounts, countryId: country2.id, cityId: cities2Id[1]})
            await Property20({ tenantAccounts, countryId: country1.id, cityId: cities1Id[0]})
        }, 5000)

}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
