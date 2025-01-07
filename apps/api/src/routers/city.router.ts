import { createCity, getCities } from "@/controllers/city.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const cityRouter = Router()

cityRouter.get('/', getCities)
cityRouter.post('/', verifyToken, uploader, createCity)

export default cityRouter