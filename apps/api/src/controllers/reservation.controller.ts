import { Request, Response, NextFunction } from 'express' 
import { getReservationService, updateReservationService } from '@/services/reservation.service/index'


export const getReservation = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.body

        if(!id) {
            return res.status(400).json({
                message: 'Tenant Id is required',
                error: true,
                data: {}
            })
        }

        const transactions = await getReservationService(id)

        if (!transactions) {
            return res.status(404).json({
                message: 'Reservation not found',
                error: true,
                data: {}
            })
        }

        res.status(200).json({
            message: 'Successfully fetch reservations',
            error: false,
            data: transactions
        })
    } catch (error) {
        next(error)
    }
}

export const updateReservation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { transactionId, status } = req.body

        const updatedTransaction = await updateReservationService(transactionId, status)

        res.status(201).json({
            message: 'Transaction Status updated successfully',
            error:false,
            data: updatedTransaction
        })
    } catch (error) {
        next(error)
    }
}