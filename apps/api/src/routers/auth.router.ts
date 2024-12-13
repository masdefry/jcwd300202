import { keepAuth, loginTenant, loginUser, registerTenant, registerUser, resetPassword, sendEmailResetPassword, signInWithGoogle, verifyEmail, verifyEmailRequest } from "@/controllers/auth.controller";
import { errorHandlingValidator } from "@/middlewares/validator/error.handling.validator";
import { loginValidator } from "@/middlewares/validator/login.validator";
import { registerValidator } from "@/middlewares/validator/register.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/', loginValidator, loginUser)
authRouter.post('/register', registerValidator,  registerUser)
authRouter.post('/tenant',loginValidator, loginTenant)
authRouter.post('/tenant/register', registerValidator, registerTenant)
authRouter.get('/verify-email-request', verifyEmailRequest)
authRouter.patch('/verify-email', verifyEmail)
authRouter.post('/send-email-reset-password', sendEmailResetPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/o-auth', signInWithGoogle)

export default authRouter