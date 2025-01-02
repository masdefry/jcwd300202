import { createPropertyType, getPropertyTypes } from "@/controllers/property.type.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyTypeRouter = Router()

propertyTypeRouter.get('/search', getPropertyTypes)
propertyTypeRouter.post('/', verifyToken,  createPropertyType)

export default propertyTypeRouter

