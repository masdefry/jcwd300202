import { createOneSeason, createSeasonalAvailabiltyByProperty, deleteSingleSeason, createSeasonalPrice, deletePropertySeason, deleteSeasonalPrice, getSeasonsByProperty, getSeasonsByPropertyRoomType, getSingleSeasonalPriceAndAvailability, updateManySeasonsByPropertySeason, updateSeasonalPrice, updateSingleSeason, getSingleSeason } from "@/controllers/season.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const seasonRouter = Router()

seasonRouter.get('/property/:slug',  verifyToken, getSeasonsByProperty)

seasonRouter.post('/', verifyToken, createSeasonalPrice)
seasonRouter.get('/single/search',  getSingleSeasonalPriceAndAvailability)
seasonRouter.put('/:propertyRoomTypeId', verifyToken, updateSeasonalPrice)
seasonRouter.delete('/:propertyRoomTypeId', verifyToken, deleteSeasonalPrice)

seasonRouter.post('/property/:slug',  verifyToken, createSeasonalAvailabiltyByProperty)
seasonRouter.get('/:propertyRoomTypeId',  verifyToken, getSeasonsByPropertyRoomType)
seasonRouter.put('/property/:slug',  verifyToken, updateManySeasonsByPropertySeason)
seasonRouter.delete('/property/:slug',  verifyToken, deletePropertySeason)

seasonRouter.post('/single/',  verifyToken, createOneSeason)
seasonRouter.put('/single/:seasonId',  verifyToken, updateSingleSeason)
seasonRouter.delete('/single/:seasonId',  verifyToken, deleteSingleSeason)
seasonRouter.get('/single/:seasonId',  verifyToken, getSingleSeason)

export default seasonRouter

