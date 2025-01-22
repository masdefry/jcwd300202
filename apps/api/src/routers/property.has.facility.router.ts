import { getPropertyHasFacilities, updatePropertyHasFacilities } from "@/controllers/property.has.facility.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyHasFacilitiesRouter = Router()

propertyHasFacilitiesRouter.get('/:slug', verifyToken, tenantRoleValidation, getPropertyHasFacilities)
propertyHasFacilitiesRouter.put('/:slug', verifyToken, tenantRoleValidation, updatePropertyHasFacilities)

export default propertyHasFacilitiesRouter