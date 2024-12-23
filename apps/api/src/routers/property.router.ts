import { dataForFilteringProperty, getProperties, getPropertyDetail, getPropertyRoomType } from "@/controllers/property.controller";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/:slug', getPropertyDetail)
propertyRouter.get('/:propertyId/search', getPropertyRoomType)
propertyRouter.get('/nav/filter', dataForFilteringProperty)


export default propertyRouter