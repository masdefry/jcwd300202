import {  deleteTenantProfile, getTenantProfile, updateTenantEmail, updateTenantProfile, updateTenantProfilePicture } from "@/controllers/tenant.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { updateTenantProfileValidator } from "@/middlewares/validator/update.tenant.profile.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const tenantRouter = Router()

tenantRouter.get('/', verifyToken, tenantRoleValidation, getTenantProfile)
tenantRouter.patch('/', verifyToken, tenantRoleValidation, updateTenantProfileValidator, updateTenantProfile)
tenantRouter.patch('/email', verifyToken, tenantRoleValidation, updateTenantEmail)
tenantRouter.patch('/profile-picture', verifyToken, tenantRoleValidation, uploader , updateTenantProfilePicture)
tenantRouter.delete('/', verifyToken, tenantRoleValidation, deleteTenantProfile)

export default tenantRouter