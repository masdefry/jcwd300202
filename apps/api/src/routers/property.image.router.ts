import { createPropertyImagesByProperty, deletePropertyImagesByProperty, getPropertyImagesByProperty } from "@/controllers/property.image.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyImageRouter = Router()

propertyImageRouter.get('/:slug', verifyToken, tenantRoleValidation, getPropertyImagesByProperty)
propertyImageRouter.post('/:slug', verifyToken, tenantRoleValidation, uploader, createPropertyImagesByProperty)
propertyImageRouter.delete('/:propertyImageId', verifyToken, tenantRoleValidation, deletePropertyImagesByProperty)

export default propertyImageRouter