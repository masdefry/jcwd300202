import { keepAuth, loginTenant, loginUser, registerTenant, registerUser, resetPasswordUser, sendEmailResetPasswordUser, signInWithGoogle, verifyEmailUser, verifyEmailRequestUser, verifyEmailTenant, verifyEmailRequestTenant, resetPasswordTenant, sendEmailResetPasswordTenant, verifyChangeEmailTenant, verifyChangeEmailUser, verifyChangeEmailRequestTenant } from "@/controllers/auth.controller";
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
authRouter.post('/tenant',loginValidator, loginTenant)

authRouter.post('/register', registerValidator,  registerUser)
authRouter.post('/tenant/register', registerValidator, registerTenant)

authRouter.post('/tenant/verify-email-request', verifyEmailRequestValidator, verifyEmailRequestTenant)
authRouter.post('/tenant/verify-change-email-request', verifyToken, verifyChangeEmailRequestTenant)
authRouter.patch('/tenant/verify-change-email', verifyToken, verifyChangeEmailTenant)
authRouter.patch('/tenant/verify-email', verifyToken, verifyEmailValidator, verifyEmailTenant)

authRouter.post('/verify-email-request', verifyEmailRequestUser)
authRouter.patch('/verify-change-email', verifyToken, verifyChangeEmailUser)
authRouter.patch('/verify-email', verifyToken, verifyEmailValidator, verifyEmailUser)

authRouter.post('/send-email-reset-password', sendEmailResetPasswordValidator, sendEmailResetPasswordUser)
authRouter.patch('/reset-password', verifyToken, resetPasswordValidator, resetPasswordUser)

authRouter.post('/tenant/send-email-reset-password', sendEmailResetPasswordValidator, sendEmailResetPasswordTenant)
authRouter.patch('/tenant/reset-password', verifyToken, resetPasswordValidator, resetPasswordTenant)

authRouter.patch('/tenant/reset-password', verifyToken, resetPasswordValidator, resetPasswordTenant)

authRouter.post('/o-auth', registerValidator, signInWithGoogle)
authRouter.get('/keep-auth', verifyToken, keepAuth)

export default authRouter