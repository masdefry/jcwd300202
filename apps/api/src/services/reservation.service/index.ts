import { prisma } from "@/connection";
import { Status } from "@/services/transaction.service/types"

export const getReservationService = async(tenantId: string) => {
    let transactions : any = [];
    await prisma.$transaction((async(tx) => {
        transactions = await tx.transaction.findMany({
            where: {
                property: {
                    tenantId,
                },
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
                    select: {
                        status: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            },
            orderBy: {
                checkInDate: 'desc',
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