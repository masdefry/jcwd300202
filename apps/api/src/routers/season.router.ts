import { createOneSeason, createSeasonalAvailabiltyByProperty, deleteSingleSeason, createSeasonalPrice, deletePropertySeason, deleteSeasonalPrice, getSeasonsByProperty, getSeasonsByPropertyRoomType, getSingleSeasonalPriceAndAvailability, updateManySeasonsByPropertySeason, updateSeasonalPrice, updateSingleSeason, getSingleSeason } from "@/controllers/season.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { createOneSeasonValidator, createSeasonalAvailabiltyByPropertyValidator, createSeasonalPriceValidator, updateManySeasonsByPropertySeasonValidator, updateSeasonalPriceValidator, updateSingleSeasonValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const seasonRouter = Router()

seasonRouter.get('/property/:slug',  verifyToken, getSeasonsByProperty)

seasonRouter.post('/', verifyToken, tenantRoleValidation, createSeasonalPriceValidator, createSeasonalPrice)
seasonRouter.get('/single/search',  getSingleSeasonalPriceAndAvailability)
seasonRouter.put('/:propertyRoomTypeId', verifyToken, tenantRoleValidation, updateSeasonalPriceValidator, updateSeasonalPrice)
seasonRouter.delete('/:propertyRoomTypeId', verifyToken, tenantRoleValidation, deleteSeasonalPrice)

seasonRouter.post('/property/:slug',  verifyToken, tenantRoleValidation, createSeasonalAvailabiltyByPropertyValidator, createSeasonalAvailabiltyByProperty)
seasonRouter.get('/:propertyRoomTypeId',  verifyToken, getSeasonsByPropertyRoomType)
seasonRouter.put('/property/:slug',  verifyToken, tenantRoleValidation, updateManySeasonsByPropertySeasonValidator, updateManySeasonsByPropertySeason)
seasonRouter.delete('/property/:slug',  verifyToken, tenantRoleValidation, deletePropertySeason)

seasonRouter.post('/single/',  verifyToken, tenantRoleValidation, createOneSeasonValidator, createOneSeason)
seasonRouter.get('/single/:seasonId',  verifyToken, getSingleSeason)
seasonRouter.put('/single/:seasonId',  verifyToken, tenantRoleValidation, updateSingleSeasonValidator, updateSingleSeason)
seasonRouter.delete('/single/:seasonId',  verifyToken, tenantRoleValidation, deleteSingleSeason)

export default seasonRouter

