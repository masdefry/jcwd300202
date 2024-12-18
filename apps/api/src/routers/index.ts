import { Router } from "express";
import express from 'express'
import authRouter from "./auth.router";
// import transactionRouter from "./transaction.router"
import landingPageRouter from "./landing.page.router";
import headerRouter  from './header.router'
import reservationRouter from './reservation.router'

const router = Router()

router.use('/auth', authRouter)
// router.use('/transaction', transactionRouter)
router.use('/landing-page', landingPageRouter)
router.use('*/images', express.static('src/public/images'))
router.use('/search', headerRouter)
router.use('/reservation', reservationRouter)


export default router