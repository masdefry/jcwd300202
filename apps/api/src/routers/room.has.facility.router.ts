import { getGeneralRoomHasFacilitiesByProperty, getRoomHasFacilities, updateRoomHasFacilities, updateRoomHasFacilitiesByProperty } from "@/controllers/room.has.facility.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const roomHasFacilitiesRouter = Router()

roomHasFacilitiesRouter.get('/:propertyRoomTypeId', verifyToken, tenantRoleValidation, getRoomHasFacilities)
roomHasFacilitiesRouter.get('/property/:slug', verifyToken, tenantRoleValidation, getGeneralRoomHasFacilitiesByProperty)
roomHasFacilitiesRouter.put('/:propertyRoomTypeId', verifyToken, tenantRoleValidation, updateRoomHasFacilities)
roomHasFacilitiesRouter.put('/property/:slug', verifyToken, tenantRoleValidation, updateRoomHasFacilitiesByProperty)

export default roomHasFacilitiesRouter