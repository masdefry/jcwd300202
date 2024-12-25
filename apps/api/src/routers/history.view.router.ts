import { createUserHistoryView } from "@/controllers/history.view.controller";
import { Router } from "express";
const historyViewRouter = Router()

historyViewRouter.post('/', createUserHistoryView)

export default historyViewRouter