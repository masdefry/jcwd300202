import { getCities } from "@/controllers/city.controller";
import { Router } from "express";
const cityRouter = Router()

cityRouter.get('/', getCities)

export default cityRouter