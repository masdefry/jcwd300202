import { prisma } from "@/connection"; 
import { ITransaction } from './types'
import { decodeToken } from '@/utils/jwt'
import { Status } from './types'
import { v4 } from 'uuid'
import addHours from "date-fns/add_hours";

const midtransClient = require("midtrans-client")

const tokenSnap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-_RX4QQiIGu3NfkORVQFO-0Zg',
    clientKey: 'SB-Mid-client-RHLdbA1UmPF_rh8s',
})

export const createTransactionService = async({ checkInDate, checkOutDate, total, price, qty, userId, tenantId, propertyId, roomId }: ITransaction) => {
    const propertyInTransaction = await prisma.property.findUnique({
        where: {
            id: propertyId
        }
    })

    if (!propertyInTransaction?.id){
        throw new Error(`Could not found property`)
    }

    const roomInTransaction = await prisma.propertyRoomType.findUnique({
        where: {
            id: roomId
        }
    })

    if(!roomInTransaction?.id) {
        throw new Error(`Could not found room type in this property`)
    }

    
    const countryId = propertyInTransaction?.countryId as number
    const cityId = propertyInTransaction?.cityId as number

    const expiryDate = addHours(new Date(), 1)

    return await prisma.$transaction(async(tx) => {
        const uuid = v4()
        const id = `ORDER_${uuid.slice(0, 5)}_${uuid.slice(0, 5)}_${uuid.slice(0, 5)}`


        const setTransaction = await tx.transaction.create({
            data: {
                id,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                total,
                price,
                qty,
                expiryDate: new Date(expiryDate),
                userId,
                tenantId,
                propertyId,
                roomId,
                countryId,
                cityId,
                transactionStatus: {
                    create: [
                        { status: Status.WAITING_FOR_PAYMENT }
                    ]
                }
            }
        })

        const params = {
            transaction_details: {
                order_id: setTransaction.id,
                gross_amount: total,
            }
        }

        const snapToken = await tokenSnap.createTransaction(params)

        const room = await prisma.propertyRoomType.findUnique({
            where: {
                id: roomId
            },
            include: {
                property: true
            }
        })


        return {
            id,
            snapToken,
            checkInDate, 
            checkOutDate,  
            total, 
            price, 
            qty, 
            expiryDate, 
            roomName: room?.name,
            propertyName: room?.property.name
        };
    })
}