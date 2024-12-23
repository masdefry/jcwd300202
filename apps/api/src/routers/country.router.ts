import { getCountries } from "@/controllers/country.controller";
import { Router } from "express";
const countryRouter = Router()

countryRouter.get('/', getCountries)

export default countryRouter