import { prisma } from "@/connection"; 

export const getRoomTypeService = async(propertyRoomTypeId: number) => {
    const room = await prisma.propertyRoomType.findUnique({
        where: {
            id: Number(propertyRoomTypeId),
        },
        select: {
            name: true,
            description: true,
            rooms: true,
            capacity: true,
            bathrooms: true,
            price: true,
            totalRooms: true
        },

    })

}