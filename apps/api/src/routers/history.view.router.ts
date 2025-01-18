import { createUserHistoryView } from "@/controllers/history.view.controller";
import { userValidator } from "@/middlewares/validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const historyViewRouter = Router()

historyViewRouter.post('/:slug', verifyToken, userValidator, createUserHistoryView)

export default historyViewRouter