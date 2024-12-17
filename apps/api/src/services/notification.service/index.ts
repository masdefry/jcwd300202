import { prisma } from "@/connection"; 
import { Status } from "@/services/transaction.service/types"

export const handleMidtransNotification = async (notification: any) => {
    const { order_id, transaction_status } = notification;
    
    if(transaction_status === "settlement"){
        await prisma.transactionStatus.create({
            data: {
                transactionId: order_id,
                status: Status.WAITING_FOR_PAYMENT,
            }
        })
    } 
}