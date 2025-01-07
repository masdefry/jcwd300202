import { createCountry, getCountries } from "@/controllers/country.controller";
import { uploader } from "@/middlewares/uploader";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const countryRouter = Router()

countryRouter.get('/', getCountries)
countryRouter.post('/', verifyToken, uploader, createCountry)

export default countryRouter