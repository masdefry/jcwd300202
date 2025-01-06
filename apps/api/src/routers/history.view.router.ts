import { createUserHistoryView } from "@/controllers/history.view.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";
const historyViewRouter = Router()

historyViewRouter.post('/:slug', verifyToken, createUserHistoryView)

export default historyViewRouter