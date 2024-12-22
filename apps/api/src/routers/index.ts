import { Router } from "express";
import express from 'express'
import authRouter from "./auth.router";
// import transactionRouter from "./transaction.router"
import landingPageRouter from "./landing.page.router";
import headerRouter  from './header.router'
import reservationRouter from './reservation.router'
import propertyRouter from "./property.router";
import roomFacilityRouter from "./room.facility.router";
import propertyFacilityRouter from "./property.facility.router";

const router = Router()

router.use('/auth', authRouter)
// router.use('/transaction', transactionRouter)
router.use('/landing-page', landingPageRouter)
router.use('*/images', express.static('src/public/images'))
router.use('/search', headerRouter)
router.use('/property', propertyRouter)
router.use('/reservation', reservationRouter)
router.use('/room-facility', roomFacilityRouter)
router.use('/property-facility', propertyFacilityRouter)


export default router