import { Request, Response, NextFunction } from 'express' 
import { handleMidtransNotification } from '@/services/notification.service/index'

export const midtransNotification = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = req.body

        const result = handleMidtransNotification(notification)

        res.status(200).json({
            message: 'Successfully get notification',
            error: false,
            data: result
        })
        
    } catch (error) {
        next(error)
    }
}