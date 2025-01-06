import { createPropertyImagesByProperty, deletePropertyImagesByProperty, getPropertyImagesByProperty } from "@/controllers/property.image.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyImageRouter = Router()

propertyImageRouter.get('/:slug', getPropertyImagesByProperty)
propertyImageRouter.post('/:slug', verifyToken, uploader, createPropertyImagesByProperty)
propertyImageRouter.delete('/:propertyImageId', verifyToken, deletePropertyImagesByProperty)

export default propertyImageRouter