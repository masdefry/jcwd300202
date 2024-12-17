import { keepAuth, loginTenant, loginUser, registerTenant, registerUser, resetPassword, sendEmailResetPassword, signInWithGoogle, verifyEmail, verifyEmailRequest } from "@/controllers/auth.controller";
import { errorHandlingValidator } from "@/middlewares/validator/error.handling.validator";
import { loginValidator } from "@/middlewares/validator/login.validator";
import { registerValidator } from "@/middlewares/validator/register.validator";
import { resetPasswordValidator } from "@/middlewares/validator/reset.password.validator";
import { sendEmailResetPasswordValidator } from "@/middlewares/validator/send.email.reset.password.validator";
import { verifyEmailValidator } from "@/middlewares/validator/verifiy.email.validator";
import { verifyEmailRequestValidator } from "@/middlewares/validator/verify.email.request.validator";
import { verifyToken } from "@/middlewares/verify.token";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/', loginValidator, loginUser)
authRouter.post('/register', registerValidator,  registerUser)

authRouter.post('/tenant',loginValidator, loginTenant)
authRouter.post('/tenant/register', registerValidator, registerTenant)

authRouter.get('/verify-email-request', verifyEmailRequestValidator, verifyEmailRequest)
authRouter.patch('/verify-email', verifyToken, verifyEmailValidator, verifyEmail)

authRouter.post('/send-email-reset-password', sendEmailResetPasswordValidator, sendEmailResetPassword)
authRouter.patch('/reset-password', resetPasswordValidator, resetPassword)

authRouter.post('/o-auth', registerValidator, signInWithGoogle)

export default authRouter