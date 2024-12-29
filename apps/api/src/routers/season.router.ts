import { createSeasonalPriceAndAvailabilty, getSingleSeasonalPriceAndAvailability } from "@/controllers/season.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const seasonRouter = Router()

seasonRouter.post('/', createSeasonalPriceAndAvailabilty)
seasonRouter.get('/single/search',  getSingleSeasonalPriceAndAvailability)

export default seasonRouter

