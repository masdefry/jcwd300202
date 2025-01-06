import { createProperty, dataForFilteringProperty, getProperties, getPropertiesByTenant, getPropertiesByUser, getPropertyDescriptions, getPropertyDetail, getPropertyRoomTypeByProperty, getRoomType, updatePropertyDescriptions } from "@/controllers/property.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/user', verifyToken, getPropertiesByUser)
propertyRouter.get('/tenant', verifyToken, getPropertiesByTenant)
propertyRouter.get('/:slug/search', getPropertyDetail)
propertyRouter.get('/:slug', verifyToken, getPropertyDescriptions)
propertyRouter.patch('/descriptions/:slug', verifyToken, updatePropertyDescriptions)
propertyRouter.get('/rooms/:propertyId/search', getPropertyRoomTypeByProperty)
propertyRouter.get('/nav/filter', dataForFilteringProperty)
// propertyRouter.get('/:propertyRoomTypeId', getRoomType)
propertyRouter.post('/', verifyToken, uploader, createProperty)


export default propertyRouter