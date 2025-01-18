import { createPropertyType, deletePropertyType, getPropertyTypes, getPropertyTypesByTenant, updatePropertyType } from "@/controllers/property.type.controller";
import { createCountryValidator, deletePropertyTypeValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyTypeRouter = Router()

propertyTypeRouter.get('/search', getPropertyTypes)
propertyTypeRouter.get('/', verifyToken, getPropertyTypesByTenant)
propertyTypeRouter.post('/', verifyToken,  createCountryValidator, createPropertyType)
propertyTypeRouter.patch('/', verifyToken, updatePropertyType)
propertyTypeRouter.patch('/delete', verifyToken,  deletePropertyTypeValidator, deletePropertyType)

export default propertyTypeRouter

