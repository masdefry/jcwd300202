import {
  keepAuthService,
  loginTenantService,
  loginUserService,
  registerTenantService,
  registerUserService,
  resetPasswordTenantService,
  resetPasswordUserService,
  sendEmailResetPasswordTenantService,
  sendEmailResetPasswordUserService,
  signInWithGoogleService,
  tenantAccessPropertyService,
  verifyChangeEmailRequestTenantService,
  verifyChangeEmailRequestUserService,
  verifyChangeEmailTenantService,
  verifyChangeEmailUserService,
  verifyEmailRequestTenantService,
  verifyEmailRequestUserService,
  verifyEmailTenantService,
  verifyEmailUserService,
} from '@/services/auth.service'
import { NextFunction, Request, Response } from 'express'

export const loginTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body

    const loginTenantProcess = await loginTenantService({ email, password })

    res.status(200).json({
      errror: false,
      message: 'Login success',
      data: {
        username: loginTenantProcess?.username,
        country: loginTenantProcess?.country,
        profilePictureUrl: loginTenantProcess?.profilePictureUrl,
        companyName: loginTenantProcess?.companyName,
        role: loginTenantProcess?.role,
        isVerified: loginTenantProcess?.isVerified,
        token: loginTenantProcess?.token,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body

    const loginUserProcess = await loginUserService({ email, password })

    res.status(200).json({
      errror: false,
      message: 'Login success',
      data: {
        username: loginUserProcess?.username,
        country: loginUserProcess?.country,
        profilePictureUrl: loginUserProcess?.profilePictureUrl,
        role: loginUserProcess?.role,
        isVerified: loginUserProcess?.isVerified,
        token: loginUserProcess?.token,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const registerUserProcess = await registerUserService({ email })

    res.status(201).json({
      error: false,
      message: 'Register user success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const registerTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const registerTenantProcess = await registerTenantService({ email })

    res.status(201).json({
      error: false,
      message: 'Register user success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailRequestUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const verifyEmailRequestUserProcess = await verifyEmailRequestUserService({
      email,
    })

    res.status(200).json({
      error: false,
      message: 'Send link verify email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyChangeEmailRequestUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const verifyChangeEmailRequestUserProcess =
      await verifyChangeEmailRequestUserService({ id, role })

    res.status(200).json({
      error: false,
      message: 'Send link verify email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyChangeEmailRequestTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const verifyChangeEmailRequestTenantProcess =
      await verifyChangeEmailRequestTenantService({ id, role })

    res.status(200).json({
      error: false,
      message: 'Send link verify email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailRequestTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const verifyEmailRequestTenantProcess =
      await verifyEmailRequestTenantService({ email })

    res.status(200).json({
      error: false,
      message: 'Send link verify email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, password, token } = req.body

    const verifyEmailUserProcess = await verifyEmailUserService({
      id,
      token,
      password,
    })

    res.status(200).json({
      error: false,
      message: 'Verify email and set password success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyEmailTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, password, token } = req.body

    const verifyEmailTenantProcess = await verifyEmailTenantService({
      id,
      token,
      password,
    })

    res.status(200).json({
      error: false,
      message: 'Verify email and set password success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const signInWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const signInWithGoogleProcess = await signInWithGoogleService({ email })

    res.status(200).json({
      error: false,
      message: 'Authentication with Google success',
      data: {
        token: signInWithGoogleProcess?.token,
        username: signInWithGoogleProcess?.username,
        role: signInWithGoogleProcess?.role,
        isVerified: signInWithGoogleProcess?.isVerified,
        isGoogleRegistered: signInWithGoogleProcess?.isGoogleRegistered,
        profilePictureUrl: signInWithGoogleProcess?.profilePictureUrl,
        country: signInWithGoogleProcess?.country,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const sendEmailResetPasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const sendEmailResetPasswordUserProcess =
      await sendEmailResetPasswordUserService({ email })

    res.status(200).json({
      error: false,
      message: 'Send email reset password success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const sendEmailResetPasswordTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body

    const sendEmailResetPasswordTenantProcess =
      await sendEmailResetPasswordTenantService({ email })

    res.status(200).json({
      error: false,
      message: 'Send email reset password success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const resetPasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, token, id } = req.body

    const resetPasswordUserProcess = await resetPasswordUserService({
      password,
      token,
      id,
    })

    res.status(200).json({
      error: false,
      message: 'Update password success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const resetPasswordTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, token, id } = req.body

    const resetPasswordTenantProcess = await resetPasswordTenantService({
      password,
      token,
      id,
    })

    res.status(200).json({
      error: false,
      message: 'Update password success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const keepAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, token } = req.body

    const keepAuthProcess = await keepAuthService({ role, token, id })

    res.status(200).json({
      error: false,
      message: 'Keep auth success',
      data: {
        username: keepAuthProcess?.username,
        isVerified: keepAuthProcess?.isVerified,
        role: keepAuthProcess?.role,
        profilePictureUrl: keepAuthProcess?.profilePictureUrl,
        country: keepAuthProcess?.country,
        token: keepAuthProcess?.token,
        companyName: keepAuthProcess?.companyName,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const verifyChangeEmailTenant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { token } = req.params

    const verifyChangeEmailTenantProcess = await verifyChangeEmailTenantService(
      { id, role, token },
    )

    res.status(200).json({
      error: false,
      message: 'Verify new email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const verifyChangeEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { token } = req.params
    const verifyChangeEmailUserProcess = await verifyChangeEmailUserService({
      id,
      role,
      token,
    })

    res.status(200).json({
      error: false,
      message: 'Verify new email success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

export const tenantAccessProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

    const tenantAccessPropertyProcess = await tenantAccessPropertyService({id, role, slug })

    res.status(200).json({
      error: false,
      message: 'Tenant authorized',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}
