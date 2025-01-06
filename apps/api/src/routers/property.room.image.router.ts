import { createPropertyRoomImagesByProperty, deletePropertyRoomImagesByProperty, getPropertyRoomImagesByProperty } from "@/controllers/property.room.image.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyRoomImageRouter = Router()

propertyRoomImageRouter.get('/:roomId', getPropertyRoomImagesByProperty)
propertyRoomImageRouter.post('/:roomId', verifyToken, uploader, createPropertyRoomImagesByProperty)
propertyRoomImageRouter.delete('/:propertyRoomImageId', verifyToken, deletePropertyRoomImagesByProperty)

export default propertyRoomImageRouter