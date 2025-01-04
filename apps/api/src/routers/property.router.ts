import { createProperty, dataForFilteringProperty, getProperties, getPropertiesByTenant, getPropertyDetail, getPropertyRoomTypeByProperty, getRoomType } from "@/controllers/property.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/tenant', verifyToken, getPropertiesByTenant)
propertyRouter.get('/:slug/search', getPropertyDetail)
propertyRouter.get('/rooms/:propertyId/search', getPropertyRoomTypeByProperty)
propertyRouter.get('/nav/filter', dataForFilteringProperty)
propertyRouter.get('/:propertyRoomTypeId', getRoomType)
propertyRouter.post('/', verifyToken, uploader, createProperty)


export default propertyRouter