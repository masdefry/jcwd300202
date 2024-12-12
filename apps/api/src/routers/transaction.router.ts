import { createTransaction } from '@/controllers/transaction.controller'
import { verifyToken } from '@/middlewares/verify.token'

import { Router } from "express";
const transactionRouter = Router()

transactionRouter.post('/create', verifyToken, createTransaction)

export default transactionRouter;