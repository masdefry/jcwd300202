import { getPropertyFacility } from "@/controllers/property.facility.controller";
import { Router } from "express";
const propertyFacilityRouter = Router()

propertyFacilityRouter.get('/', getPropertyFacility)

export default propertyFacilityRouter