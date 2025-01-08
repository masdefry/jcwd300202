import { getGeneralRoomHasFacilitiesByProperty, getRoomHasFacilities, updateRoomHasFacilities, updateRoomHasFacilitiesByProperty } from "@/controllers/room.has.facility.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const roomHasFacilitiesRouter = Router()

roomHasFacilitiesRouter.get('/:propertyRoomTypeId', verifyToken, getRoomHasFacilities)
roomHasFacilitiesRouter.get('/property/:slug', verifyToken, getGeneralRoomHasFacilitiesByProperty)
roomHasFacilitiesRouter.put('/:propertyRoomTypeId', verifyToken, updateRoomHasFacilities)
roomHasFacilitiesRouter.put('/property/:slug', verifyToken, updateRoomHasFacilitiesByProperty)

export default roomHasFacilitiesRouter