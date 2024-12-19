import { getPropertyDetail } from "@/controllers/property.controller";
import { Router } from "express";

const propertyRouter = Router()

propertyRouter.get('/:slug', getPropertyDetail)

export default propertyRouter