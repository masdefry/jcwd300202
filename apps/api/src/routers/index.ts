import { Router } from "express";
import express from 'express'
import authRouter from "./auth.router";
import landingPageRouter from "./landing.page.router";

const router = Router()

router.use('/auth', authRouter)
router.use('/landing-page', landingPageRouter)
router.use('*/images', express.static('src/public/images'))

export default router