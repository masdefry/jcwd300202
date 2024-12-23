import {  deleteTenantProfile, getTenantProfile, updateTenantProfile, updateTenantProfilePicture } from "@/controllers/tenant.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const tenantRouter = Router()

tenantRouter.get('/', getTenantProfile)
tenantRouter.patch('/', updateTenantProfile)
tenantRouter.patch('/profile-picture', uploader ,updateTenantProfilePicture)
tenantRouter.delete('/', deleteTenantProfile)

export default tenantRouter