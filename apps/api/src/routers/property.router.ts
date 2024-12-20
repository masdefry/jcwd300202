import { getPropertyDetail, getPropertyRoomType } from "@/controllers/property.controller";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/:slug', getPropertyDetail)
propertyRouter.get('/:propertyId/search', getPropertyRoomType)

export default propertyRouter