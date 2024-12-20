import { getPropertyRoomFacility } from "@/controllers/room.facility.controller";
import { Router } from "express";
const roomFacilityRouter = Router()

roomFacilityRouter.get('/', getPropertyRoomFacility)

export default roomFacilityRouter