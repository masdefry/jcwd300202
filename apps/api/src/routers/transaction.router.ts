import { createTransaction, transactionHistory, midtransCallback, getTransactionById } from '@/controllers/transaction.controller'
import { verifyToken } from '@/middlewares/verify.token'

import { Router } from "express";
const transactionRouter = Router()

transactionRouter.post('/create', verifyToken, createTransaction)
transactionRouter.get('/all', verifyToken, transactionHistory)
transactionRouter.post('/callback', verifyToken, midtransCallback)
transactionRouter.get('/:id', verifyToken, getTransactionById)


export default transactionRouter;