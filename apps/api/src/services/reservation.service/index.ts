import { prisma } from "@/connection";
import { Status } from "@/services/transaction.service/types"

export const getReservationService = async(id: string) => {
    let transactions : any = [];
    await prisma.$transaction((async(tx) => {
        transactions = await tx.transaction.findMany({
            where: {
                property: {
                    tenantId: id,
                },
                transactionStatus: {
                    some: {
                        status: 'WAITING_FOR_CONFIRMATION_PAYMENT'
                    }
                }
            },
            select: {
                id: true,
                checkInDate: true,
                checkOutDate: true,
                // nights: true,
                total: true,
                price: true,
                qty: true,
                expiryDate: true,
                // adult: true,
                // children:true,
                userId: true,
                room: {
                    select: {
                        id: true,
                        name: true,
                        capacity: true,
                    }
                },
                transactionStatus: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1,
                    select: {
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            }
        })
    }), {
        timeout: 50000
    })

    console.log('TRANSAKSIIIIII')
    // console.log(transactions)

    if (!Array.isArray(transactions) || transactions.length <=0){
        return null;
    }
    
    return transactions
}

export const getReservationByIdService = async(id: string) => {
    let reservations: any = []

    await prisma.$transaction(async(tx) => {
        reservations = await tx.transaction.findMany({
            where: {
                property: {
                    id
                }
            },
            select: {
                id: true,
                userId: true,
                checkInDate: true,
                checkOutDate: true,
                roomId: true,
                room: {
                    select: {
                        id: true,
                        name: true,
                        capacity: true,
                    }
                },
                transactionStatus: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1,
                    select: {
                        status: true,
                        createdAt: true
                    }
                },
                transactionUpload: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1,
                    select: {
                        directory: true,
                        filename: true
                    }
                },
                user: {  
                    select: {
                        id: true,
                        email: true,
                    },
                },
                
            }
        })
    })

    if (!Array.isArray(reservations) || reservations.length <=0){
        return null;
    }

    return reservations

}

export const updateReservationService = async(transactionId: string, status: Status) => {
    if (![Status.PAID, Status.CANCELLED].includes(status)) {
        throw new Error('Invalid status')
    }

    const updatedTransaction = await prisma.transactionStatus.create({
        data: {
            transactionId,
            status,
            updatedAt: new Date(),
        }
    })

    return updatedTransaction
}