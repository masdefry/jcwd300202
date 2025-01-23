import { Request, Response, NextFunction } from 'express' 
import { NextApiRequest, NextApiResponse } from 'next';
import { createTransactionService, updateTransactionStatusService, handleExpiredTransaction, transactionHistoryService, getTransactionByIdService } from '@/services/transaction.service'
import { ITransaction } from '@/services/transaction.service/types'
import { Status } from '@/services/transaction.service/types'
import crypto from 'crypto'
import axios from 'axios' 

const MIDTRANS_SERVER_KEY = 'SB-Mid-server-_RX4QQiIGu3NfkORVQFO-0Zg'

export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const {
            checkInDate = new Date(),
            checkOutDate = new Date(),
            total,
            price,
            qty,
            adult,
            children,
            tenantId,
            propertyId,
            roomId,
        } = req.body;

        const userId = req.body.id;
        if (!userId) {
            return res.status(403).json({
                message: "Unauthorized",
                error: true
            })
        }

        const payment = await createTransactionService({ 
            checkInDate, 
            checkOutDate, 
            total, 
            price, 
            qty, 
            adult, 
            children,
            userId: userId,
            tenantId, 
            propertyId, 
            roomId })

        res.status(201).json({
            message: 'Transaction created successfully',
            error: false,
            data: payment
        })

    } catch (error) {
        next(error)
    }
}

export const midtransCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = req.body;
        console.log('Received signature_key>>>:', notification.signature_key);

        // Calculate the hash for signature verification
        const hash = crypto
            .createHmac('sha512', MIDTRANS_SERVER_KEY)
            .update(JSON.stringify(notification))
            .digest('hex');

        // Verify the signature
        // if (notification.signature_key !== hash) {
        //     return res.status(400).json({
        //         message: 'Invalid signature',
        //         error: true,
        //     });
        // }

        
        console.log('Calculated hash:', hash);
        console.log('>>>>>>>>>>>>')

        const { transaction_status, order_id, status_code } = notification;
        let status: Status;

        switch (transaction_status) {
            case 'settlement':
                status = Status.WAITING_FOR_CONFIRMATION_PAYMENT;
                await updateTransactionStatusService(order_id, status);
                break;
            case 'capture':
            case 'cancel':
                status = Status.CANCELLED;
                await updateTransactionStatusService(order_id, status);
                break;
            default:
                status = Status.WAITING_FOR_PAYMENT;
                await updateTransactionStatusService(order_id, status);
                break;
        }

        const transactionStatus = {
            order_id,
            status,
            transaction_status,
            status_code,
        };

        return res.status(200).json({
            message: 'Transaction status updated successfully',
            error: false,
            data: transactionStatus,
        });
    } catch (error) {
        next(error);
        console.log('>>>>>>> DISINI')
    }
};

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

export const transactionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Transaction ID is required',
                error: true,
                data: {}
            });
        }

        const result = await transactionHistoryService(id);

        if (!result) {
            return res.status(404).json({
                message: 'Transaction not found',
                error: true,
                data: {}
            });
        }

        res.status(200).json({
            message: 'Successfully fetched transaction history',
            error: false,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params

        if(!id) {
            return res.status(400).json({
                message: 'Transactioin ID is required'
            })
        }

        const transaction = await getTransactionByIdService(id)

        res.status(200).json({
            message: `Successfully get transaction by id ${id}`,
            error: false,
            data: transaction

        })

    }  catch (error) {
        next(error)
    }
}

