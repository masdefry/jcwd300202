import { dataForFilteringProperty, getProperties, getPropertyDetail, getPropertyRoomTypeByProperty, getRoomType } from "@/controllers/property.controller";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/', getProperties)
propertyRouter.get('/:slug/search', getPropertyDetail)
propertyRouter.get('/rooms/:propertyId/search', getPropertyRoomTypeByProperty)
propertyRouter.get('/nav/filter', dataForFilteringProperty)
propertyRouter.get('/:propertyRoomTypeId', getRoomType)


export default propertyRouter