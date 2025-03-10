import { createPropertyFacility, getPropertyFacility } from "@/controllers/property.facility.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { createPropertyFacilityValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyFacilityRouter = Router()

propertyFacilityRouter.get('/', getPropertyFacility)
propertyFacilityRouter.post('/', verifyToken, tenantRoleValidation, uploader, createPropertyFacilityValidator, createPropertyFacility)

export default propertyFacilityRouter