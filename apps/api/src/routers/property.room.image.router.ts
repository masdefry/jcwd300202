import { createPropertyRoomImagesByProperty, deletePropertyRoomImagesByProperty, getPropertyRoomImagesByProperty } from "@/controllers/property.room.image.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyRoomImageRouter = Router()

propertyRoomImageRouter.get('/:roomId', verifyToken, tenantRoleValidation, getPropertyRoomImagesByProperty)
propertyRoomImageRouter.post('/:roomId', verifyToken, tenantRoleValidation, uploader, createPropertyRoomImagesByProperty)
propertyRoomImageRouter.delete('/:propertyRoomImageId', verifyToken, tenantRoleValidation, deletePropertyRoomImagesByProperty)

export default propertyRoomImageRouter