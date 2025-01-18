import {  deleteTenantProfile, getTenantProfile, updateTenantEmail, updateTenantProfile, updateTenantProfilePicture } from "@/controllers/tenant.controller";
import { uploader } from "@/middlewares/uploader";
import { updateTenantProfileValidator } from "@/middlewares/validator/update.tenant.profile.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const tenantRouter = Router()

tenantRouter.get('/', verifyToken, getTenantProfile)
tenantRouter.patch('/', verifyToken, updateTenantProfileValidator, updateTenantProfile)
tenantRouter.patch('/email', verifyToken, updateTenantEmail)
tenantRouter.patch('/profile-picture', verifyToken, uploader , updateTenantProfilePicture)
tenantRouter.delete('/', verifyToken, deleteTenantProfile)

export default tenantRouter