import { loginTenant, loginUser, registerTenant, registerUser, verifyEmail, verifyEmailRequest } from "@/controllers/auth.controller";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/', loginUser)
authRouter.post('/register', registerUser)
authRouter.post('/tenant', loginTenant)
authRouter.post('/tenant/register', registerTenant)
authRouter.get('/verify-email-request', verifyEmailRequest)
authRouter.patch('/verify-email', verifyEmail)

export default authRouter