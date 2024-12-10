import { keepAuth, loginTenant, loginUser, registerTenant, registerUser, resetPassword, sendEmailResetPassword, signInWithGoogle, verifyEmail, verifyEmailRequest } from "@/controllers/auth.controller";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/', loginUser)
authRouter.post('/register', registerUser)
authRouter.post('/tenant', loginTenant)
authRouter.post('/tenant/register', registerTenant)
authRouter.get('/verify-email-request', verifyEmailRequest)
authRouter.patch('/verify-email', verifyEmail)
authRouter.post('/send-email-reset-password', sendEmailResetPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.get('/o-auth', signInWithGoogle)

export default authRouter