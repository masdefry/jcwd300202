import { Request, Response, NextFunction } from 'express' 
import { createTransactionService, handleExpiredTransaction, transactionHistoryService } from '@/services/transaction.service'
import { ITransaction } from '@/services/transaction.service/types'

export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { checkInDate, checkOutDate, total, price, qty, userId, tenantId, propertyId, roomId }: ITransaction= req.body

        const payment = await createTransactionService({ checkInDate, checkOutDate, total, price, qty, userId, tenantId, propertyId, roomId })

        res.status(201).json({
            message: 'Transaction created successfully',
            error: false,
            data: payment
        })

    } catch (error) {
        next(error)
    }
}

export const expiredTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await handleExpiredTransaction()

        res.status(200).json({
            message: 'Expired transactions handled successfully',
            error: false
        })
    } catch (error) {
        next(error)
    }
}

export const transactionHistory = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body

        if(!id) {
            return res.status(400).json({
                message: 'Transaction Id is required',
                error: true,
                data: {}
            })
        }

        const result = await transactionHistoryService(id)

        if (!result) {
            return res.status(404).json({
                message: 'Transaction not found',
                error: true,
                data: {}
            });
        }

        console.log('transaction:' , result)

        res.status(200).json({
            message: 'Successfully fetch transactions',
            error: false,
            data: result
        })
    } catch (error) {
        next(error)
    }
}
