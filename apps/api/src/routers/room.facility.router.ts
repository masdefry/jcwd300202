import { createPropertyRoomFacility, getPropertyRoomFacility } from "@/controllers/room.facility.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const roomFacilityRouter = Router()

roomFacilityRouter.get('/', getPropertyRoomFacility)
roomFacilityRouter.post('/', verifyToken, uploader, createPropertyRoomFacility)

export default roomFacilityRouter