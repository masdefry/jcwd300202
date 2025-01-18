import { createProperty, dataForFilteringProperty, deleteProperty, getProperties, getPropertiesByTenant, getPropertiesByUser, getPropertyDescriptions, getPropertyDetail, getPropertyRoomTypeByProperty, getRoomType, updatePropertyDescriptions, updatePropertyGeneralInfo } from "@/controllers/property.controller";
import { uploader } from "@/middlewares/uploader";
import { createPropertyValidator, deletePropertyValidator, updatePropertyDescriptionsValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/user', verifyToken, getPropertiesByUser)
propertyRouter.get('/tenant', verifyToken, getPropertiesByTenant)
propertyRouter.get('/:slug/search', getPropertyDetail)
propertyRouter.get('/:slug', verifyToken, getPropertyDescriptions)
propertyRouter.patch('/descriptions/:slug', verifyToken, updatePropertyDescriptionsValidator, updatePropertyDescriptions)
propertyRouter.patch('/general-info/:slug', verifyToken, updatePropertyGeneralInfo)
propertyRouter.get('/rooms/:propertyId/search', getPropertyRoomTypeByProperty)
propertyRouter.get('/nav/filter', dataForFilteringProperty)
propertyRouter.post('/', verifyToken, uploader, createPropertyValidator, createProperty)
propertyRouter.patch('/delete/:slug', verifyToken, deletePropertyValidator, deleteProperty)


export default propertyRouter