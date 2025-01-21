import { createCity, getCities } from "@/controllers/city.controller";
import { uploader } from "@/middlewares/uploader";
import { createCityValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const cityRouter = Router()

cityRouter.get('/', getCities)
cityRouter.post('/', verifyToken, uploader, createCityValidator, createCity)

export default cityRouter