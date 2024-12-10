import { Router } from "express";
import authRouter from "./auth.router";
import transactionRouter from "./transaction.router"


const router = Router()

router.use('/auth', authRouter)
router.use('/transaction', transactionRouter)

export default router