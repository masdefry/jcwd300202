import { createPropertyType, deletePropertyType, getPropertyTypes, getPropertyTypesByTenant, updatePropertyType } from "@/controllers/property.type.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { createCountryValidator, deletePropertyTypeValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyTypeRouter = Router()

propertyTypeRouter.get('/search', getPropertyTypes)
propertyTypeRouter.get('/', verifyToken, tenantRoleValidation, getPropertyTypesByTenant)
propertyTypeRouter.post('/', verifyToken, tenantRoleValidation,  createCountryValidator, createPropertyType)
propertyTypeRouter.patch('/', verifyToken, tenantRoleValidation, updatePropertyType)
propertyTypeRouter.patch('/delete', verifyToken, tenantRoleValidation,  deletePropertyTypeValidator, deletePropertyType)

export default propertyTypeRouter

