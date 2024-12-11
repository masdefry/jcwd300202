import { Router } from "express";
import headerRouter  from './header.router'

const router = Router()

router.use('/header', headerRouter)

export default router