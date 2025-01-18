import { createOneSeason, createSeasonalAvailabiltyByProperty, deleteSingleSeason, createSeasonalPrice, deletePropertySeason, deleteSeasonalPrice, getSeasonsByProperty, getSeasonsByPropertyRoomType, getSingleSeasonalPriceAndAvailability, updateManySeasonsByPropertySeason, updateSeasonalPrice, updateSingleSeason, getSingleSeason } from "@/controllers/season.controller";
import { createOneSeasonValidator, createSeasonalAvailabiltyByPropertyValidator, createSeasonalPriceValidator, updateManySeasonsByPropertySeasonValidator, updateSeasonalPriceValidator, updateSingleSeasonValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const seasonRouter = Router()

seasonRouter.get('/property/:slug',  verifyToken, getSeasonsByProperty)

seasonRouter.post('/', verifyToken, createSeasonalPriceValidator, createSeasonalPrice)
seasonRouter.get('/single/search',  getSingleSeasonalPriceAndAvailability)
seasonRouter.put('/:propertyRoomTypeId', verifyToken, updateSeasonalPriceValidator, updateSeasonalPrice)
seasonRouter.delete('/:propertyRoomTypeId', verifyToken, deleteSeasonalPrice)

seasonRouter.post('/property/:slug',  verifyToken, createSeasonalAvailabiltyByPropertyValidator, createSeasonalAvailabiltyByProperty)
seasonRouter.get('/:propertyRoomTypeId',  verifyToken, getSeasonsByPropertyRoomType)
seasonRouter.put('/property/:slug',  verifyToken, updateManySeasonsByPropertySeasonValidator, updateManySeasonsByPropertySeason)
seasonRouter.delete('/property/:slug',  verifyToken, deletePropertySeason)

seasonRouter.post('/single/',  verifyToken, createOneSeasonValidator, createOneSeason)
seasonRouter.get('/single/:seasonId',  verifyToken, getSingleSeason)
seasonRouter.put('/single/:seasonId',  verifyToken, updateSingleSeasonValidator, updateSingleSeason)
seasonRouter.delete('/single/:seasonId',  verifyToken, deleteSingleSeason)

export default seasonRouter

