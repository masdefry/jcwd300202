import { Router } from "express";
import express from 'express'
import authRouter from "./auth.router";
import transactionRouter from "./transaction.router"
import landingPageRouter from "./landing.page.router";
import headerRouter  from './header.router'
import reservationRouter from './reservation.router'
import propertyRouter from "./property.router";
import roomFacilityRouter from "./room.facility.router";
import propertyFacilityRouter from "./property.facility.router";
import userRouter from "./user.router";
import cityRouter from "./city.router";
import countryRouter from "./country.router";
import roomTypeRouter from './property.room.type.router'
import tenantRouter from "./tenant.router";
import historyViewRouter from "./history.view.router";
import seasonRouter from "./season.router";
import propertyTypeRouter from "./property.type.router";


const router = Router()

router.use('/auth', authRouter)
router.use('/transaction', transactionRouter)
router.use('/landing-page', landingPageRouter)
router.use('*/images', express.static('src/public/images'))
router.use('/search', headerRouter)
router.use('/property', propertyRouter)
router.use('/reservation', reservationRouter)
router.use('/room-facility', roomFacilityRouter)
router.use('/property-facility', propertyFacilityRouter)
router.use('/user', userRouter)
router.use('/tenant', tenantRouter)
router.use('/city', cityRouter)
router.use('/country', countryRouter)
router.use('/room-type', roomTypeRouter)
router.use('/history', historyViewRouter)
router.use('/season', seasonRouter)
router.use('/property-type', propertyTypeRouter)



export default router