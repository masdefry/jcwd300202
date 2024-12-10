import { Request, Response, NextFunction } from 'express' 
import { createTransactionService } from '@/services/transaction.service'
import { ITransaction } from '@/services/transaction.service/types'

export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkInDate, checkOutDate, total, price, qty, expiryDate, userId, tenantId, propertyId, roomId }: ITransaction= req.body

        const payment = await createTransactionService({ checkInDate, checkOutDate, total, price, qty, expiryDate, userId, tenantId, propertyId, roomId })

        res.status(201).json({
            message: 'Transaction created successfully',
            error: false,
            data: payment
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to create transaction',
            error: true,
            data: {}
        })
    }
}

