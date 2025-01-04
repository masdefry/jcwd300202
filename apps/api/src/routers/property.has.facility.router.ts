import { getPropertyHasFacilities, updatePropertyHasFacilities } from "@/controllers/property.has.facility.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const propertyHasFacilitiesRouter = Router()

propertyHasFacilitiesRouter.get('/:slug', verifyToken, getPropertyHasFacilities)
propertyHasFacilitiesRouter.put('/:slug', verifyToken, updatePropertyHasFacilities)

export default propertyHasFacilitiesRouter