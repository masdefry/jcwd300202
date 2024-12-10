import { getLandingPageData } from "@/controllers/landing.page.controller";
import { Router } from "express";

const landingPageRouter = Router()

landingPageRouter.get('/', getLandingPageData)

export default landingPageRouter