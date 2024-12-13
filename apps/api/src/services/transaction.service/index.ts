import { prisma } from "@/connection"; 
import { ITransaction } from './types'
import { decodeToken } from '@/utils/jwt'
import { Status } from './types'
import { v4 } from 'uuid'
import { addHours } from 'date-fns';
import { differenceInDays } from 'date-fns'

const midtransClient = require("midtrans-client")

const tokenSnap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-_RX4QQiIGu3NfkORVQFO-0Zg',
    clientKey: 'SB-Mid-client-RHLdbA1UmPF_rh8s',
})

export const createTransactionService = async({ checkInDate, checkOutDate, total, price, qty, adult, children, userId, tenantId, propertyId, roomId }: ITransaction) => {
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
    const nights = differenceInDays(new Date(checkOutDate), new Date(checkInDate))
    console.log(cityId, countryId)

    return await prisma.$transaction(async(tx) => {
        const uuid = v4()
        const id = `ORDER_${uuid.slice(0, 5)}_${uuid.slice(0, 5)}_${uuid.slice(0, 5)}`


        const setTransaction = await tx.transaction.create({
            data: {
                id,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                nights,
                total,
                price,
                qty,
                adult,
                children,
                expiryDate: addHours(new Date(), 1),
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
            nights,
            total, 
            price, 
            qty, 
            adult,
            children,
            roomName: room?.name,
            propertyName: room?.property.name
        }
    })
}

export const handleExpiredTransaction = async() => {
    const now = new Date();

    const expiredTransactions = await prisma.transaction.findMany({
        where: {
            expiryDate: {
                lte: now
            }, 
            transactionStatus: {
                some: {
                    status: Status.WAITING_FOR_PAYMENT
                }
            }
        },
        include: {
            transactionStatus: true
        }
    })

    for (const transaction of expiredTransactions) {
        await prisma.transactionStatus.create({
            data: {
                transactionId: transaction.id,
                status: Status.EXPIRED
            }
        })
    }
}

export const transactionHistoryService = async(id: string) => {
    let transactions : any= [];
    await prisma.$transaction((async(tx) => {

        transactions = await tx.transaction.findMany({
            where: {
                userId: id
            },
            select: {
                id: true,
                checkInDate: true,
                checkOutDate: true,
                total: true,
                price: true,
                qty: true,
                expiryDate: true,
                room: {
                    select: {
                        id: true,
                        name: true,
                        property: {
                            select: {
                                id: true,
                                name: true,
                                country: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                city: {
                                    select: {
                                        id: true,
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                },
                transactionStatus: {
                    select: {
                        id: true,
                        status: true,
                        transactionId: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            },
            orderBy: {
                checkInDate: 'desc',
            }    
        })
    }), {
        timeout: 10000
    })

    console.log(transactions)

    if (!Array.isArray(transactions) || transactions.length <= 0) {
        return null;
    }

    return transactions
}

