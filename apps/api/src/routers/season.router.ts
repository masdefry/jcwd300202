import { createSeasonalPriceAndAvailabilty, getSeasonsByProperty, getSingleSeasonalPriceAndAvailability, updateSeason } from "@/controllers/season.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const seasonRouter = Router()

seasonRouter.post('/', verifyToken, createSeasonalPriceAndAvailabilty)
seasonRouter.put('/', verifyToken, updateSeason)
seasonRouter.get('/single/search',  getSingleSeasonalPriceAndAvailability)
seasonRouter.get('/:slug',  verifyToken, getSeasonsByProperty)

export default seasonRouter

