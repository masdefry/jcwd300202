import { createProperty, dataForFilteringProperty, deleteProperty, getProperties, getPropertiesByTenant, getPropertiesByUser, getPropertyDescriptions, getPropertyDetail, getPropertyDetailByTenant, getPropertyRoomTypeByProperty, getRoomType, updatePropertyDescriptions, updatePropertyGeneralInfo } from "@/controllers/property.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { createPropertyValidator, deletePropertyValidator, updatePropertyDescriptionsValidator, updatePropertyGeneralInfoValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/user', verifyToken, getPropertiesByUser)
propertyRouter.get('/tenant', verifyToken, getPropertiesByTenant)
propertyRouter.get('/:slug/search', getPropertyDetail)
propertyRouter.get('/:slug/tenant', verifyToken, getPropertyDetailByTenant)
propertyRouter.get('/:slug', verifyToken, getPropertyDescriptions)
propertyRouter.patch('/descriptions/:slug', verifyToken, tenantRoleValidation, updatePropertyDescriptionsValidator, updatePropertyDescriptions)
propertyRouter.patch('/general-info/:slug', verifyToken, tenantRoleValidation, updatePropertyGeneralInfoValidator, updatePropertyGeneralInfo)
propertyRouter.get('/rooms/:propertyId/search', getPropertyRoomTypeByProperty)
propertyRouter.get('/nav/filter', dataForFilteringProperty)
propertyRouter.post('/', verifyToken, tenantRoleValidation, uploader, createPropertyValidator, createProperty)
propertyRouter.patch('/delete/:slug', verifyToken, tenantRoleValidation, deletePropertyValidator, deleteProperty)


export default propertyRouter