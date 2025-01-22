import { createCity, getCities } from "@/controllers/city.controller";
import { uploader } from "@/middlewares/uploader";
import { createCityValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
import { tenantRoleValidation } from "../middlewares/tenant.role.validation";
const cityRouter = Router()

cityRouter.get('/', getCities)
cityRouter.post('/', verifyToken, tenantRoleValidation, uploader, createCityValidator, createCity)

export default cityRouter