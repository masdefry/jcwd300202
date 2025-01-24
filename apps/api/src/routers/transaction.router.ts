import { createTransaction, transactionHistory, midtransCallback, getTransactionById, cancelTransaction, uploadPayment } from '@/controllers/transaction.controller'
import { verifyToken } from '@/middlewares/verify.token'
import { uploader } from "@/middlewares/uploader";

import { Router } from "express";
const transactionRouter = Router()

transactionRouter.post('/create', verifyToken, createTransaction)
transactionRouter.get('/all', verifyToken, transactionHistory)
transactionRouter.post('/callback', verifyToken, midtransCallback)
transactionRouter.get('/:id', verifyToken, getTransactionById)
transactionRouter.post('/cancel/:id', verifyToken, cancelTransaction)
transactionRouter.post('/upload/:id', verifyToken, uploader, uploadPayment)


export default transactionRouter;