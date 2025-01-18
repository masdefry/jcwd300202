import { createPropertyRoomFacility, getPropertyRoomFacility } from "@/controllers/room.facility.controller";
import { uploader } from "@/middlewares/uploader";
import { createPropertyFacilityValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const roomFacilityRouter = Router()

roomFacilityRouter.get('/', getPropertyRoomFacility)
roomFacilityRouter.post('/', verifyToken, uploader, createPropertyFacilityValidator, createPropertyRoomFacility)

export default roomFacilityRouter