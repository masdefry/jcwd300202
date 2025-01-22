import { createCountry, getCountries } from "@/controllers/country.controller";
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { uploader } from "@/middlewares/uploader";
import { createCountryValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const countryRouter = Router()

countryRouter.get('/', getCountries)
countryRouter.post('/', verifyToken, tenantRoleValidation, uploader, createCountryValidator, createCountry)

export default countryRouter