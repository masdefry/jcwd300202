import prisma from '@/prisma'
import { comparePassword, hashPassword } from '@/utils/hashPassword'
import { createToken, createTokenExpiresIn1H, decodeToken } from '@/utils/jwt'
import { transporter } from '@/utils/transporter'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { compile } from 'handlebars'
import { JwtPayload } from 'jsonwebtoken'
import { text } from 'stream/consumers'
import { IUser } from './types'

export const loginTenantService = async ({ email, password }: Pick<IUser, 'email' | 'password'>) => {
    const isEmailExist = await prisma.tenant.findUnique({
      where: {
        email,
      },
    })

    if (!isEmailExist?.id || isEmailExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (!isEmailExist?.password)
      throw { msg: 'Please make request for verify email!', status: 406 }

    const isPasswordValid = await comparePassword(
      password as string,
      isEmailExist!.password,
    )
    if (!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

    const token = await createToken({
      id: isEmailExist!.id,
      role: isEmailExist!.role,
    })

     return {
        username: isEmailExist?.pic,
        country: '',
        profilePictureUrl: isEmailExist?.directory
          ? `http://localhost:5000/api/${isEmailExist?.directory}/${isEmailExist?.filename}.${isEmailExist.fileExtension}`
          : '',
        companyName: isEmailExist?.companyName,
        role: isEmailExist?.role,
        isVerified: isEmailExist?.isVerified,
        token,
      }
}

export const loginUserService = async ({ email, password }: Pick<IUser, 'email' | 'password'> ) => {

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email,
        isGoogleRegistered: false,
      },
      include: {
        country: true,
      },
    })

    if (!isEmailExist?.id || isEmailExist.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (!isEmailExist?.password)
      throw { msg: 'Please make request for verify email!', status: 406 }

    const isPasswordValid = await comparePassword(
      password as string,
      isEmailExist!.password,
    )
    if (!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

    const token = await createToken({
      id: isEmailExist!.id,
      role: isEmailExist!.role,
    })

    return {
        username: isEmailExist?.username,
        country: isEmailExist?.country?.name,
        profilePictureUrl: `http://localhost:5000/api/${isEmailExist?.directory}/${isEmailExist?.filename}.${isEmailExist?.fileExtension}`,
        role: isEmailExist?.role,
        isVerified: isEmailExist?.isVerified,
        token,
      }
}

export const registerUserService = async ({ email }: Pick<IUser, 'email' >) => {

    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (isUserExist) throw { msg: 'User already exist!', status: 406 }
    let tokenForVerifyEmail, username, profilePictureUrl, token, createdUser

    await prisma.$transaction(async (tx) => {
      createdUser = await tx.user.create({
        data: {
          email,
        },
      })

      username = createdUser?.username

      token = await createToken({ id: createdUser.id, role: createdUser.role })

      tokenForVerifyEmail = await createTokenExpiresIn1H({
        id: createdUser.id,
        role: createdUser.role,
      })

      await tx.user.update({
        where: {
          id: createdUser.id,
        },
        data: {
          token: tokenForVerifyEmail,
        },
      })
    })

    const verifyEmailLink = `http://localhost:3000/auth/verify/${tokenForVerifyEmail}`

    const emailBody = fs.readFileSync(
      './src/public/body.email/verify.email.html',
      'utf-8',
    )
    let compiledEmailBody: any = await compile(emailBody)
    compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

    await transporter.sendMail({
      to: email,
      subject: 'Verify Email [Roomify]',
      html: compiledEmailBody,
    })

    return {
        email,
      }
}

export const registerTenantService = async ({ email }: Pick<IUser, 'email' >) => {
    let compiledEmailBody, createdTenant, token
    const isEmailExist = await prisma.tenant.findUnique({
      where: {
        email,
      },
    })

    if (isEmailExist?.id) throw { msg: 'Tenant already exist!', status: 406 }

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        email,
      },
    })

    if (isTenantExist) throw { msg: 'Tenant already exist!', status: 406 }

    await prisma.$transaction(
      async (tx) => {
        createdTenant = await tx.tenant.create({
          data: {
            email,
          },
        })

        token = await createToken({
          id: createdTenant.id,
          role: createdTenant.role,
        })
        const tokenForVerifyEmail = await createTokenExpiresIn1H({
          id: createdTenant.id,
          role: createdTenant.role,
        })

        const verifyEmailLink = `http://localhost:3000/tenant/auth/verify/${tokenForVerifyEmail}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/verify.email.tenant.html',
          'utf-8',
        )
        compiledEmailBody = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

        await tx.tenant.update({
          where: {
            id: createdTenant.id,
          },
          data: {
            token: tokenForVerifyEmail,
          },
        })
      },
      {
        timeout: 25000,
      },
    )

    await transporter.sendMail({
      to: email,
      subject: 'Verify Email [Roomify]',
      html: compiledEmailBody,
    })

    return {
        email,
      }
}

export const verifyEmailRequestUserService = async ({ email }: Pick<IUser, 'email'>) => {

    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.isVerified)
      throw { msg: 'Email already verified!', status: 406 }

    const tokenForVerifyEmail = await createTokenExpiresIn1H({
      id: isUserExist.id,
      role: isUserExist.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: {
            id: isUserExist.id,
          },
          data: {
            token: tokenForVerifyEmail,
          },
        })

        let verifyEmailLink, emailBody
        if (isUserExist?.password) {
          verifyEmailLink = `http://localhost:3000/auth/verify/email/${tokenForVerifyEmail}`
          emailBody = fs.readFileSync(
            './src/public/body.email/verify.change.email.html',
            'utf-8',
          )
        } else {
          verifyEmailLink = `http://localhost:3000/auth/verify/${tokenForVerifyEmail}`
          emailBody = fs.readFileSync(
            './src/public/body.email/verify.email.html',
            'utf-8',
          )
        }

        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

        await transporter.sendMail({
          to: email,
          subject: 'Request Verify Email [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

}

export const verifyChangeEmailRequestUserService = async ({ id, role }: Pick<IUser, 'id' | 'role'>) => {

    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }
    if (isUserExist?.isVerified)
      throw { msg: 'Email already verified!', status: 406 }

    const tokenForVerifyEmail = await createTokenExpiresIn1H({
      id: isUserExist.id,
      role: isUserExist.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: {
            id: isUserExist.id,
          },
          data: {
            token: tokenForVerifyEmail,
          },
        })

        const verifyEmailLink = `http://localhost:3000/auth/verify/email/${tokenForVerifyEmail}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/verify.email.html',
          'utf-8',
        )
        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

        await transporter.sendMail({
          to: isUserExist?.email,
          subject: 'Request Verify Email [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

}

export const verifyChangeEmailRequestTenantService = async ({ id, role }: Pick<IUser, 'id' | 'role'>) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }
    if (isTenantExist?.isVerified)
      throw { msg: 'Email already verified!', status: 406 }

    const tokenForVerifyEmail = await createTokenExpiresIn1H({
      id: isTenantExist.id,
      role: isTenantExist.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.tenant.update({
          where: {
            id: isTenantExist.id,
          },
          data: {
            token: tokenForVerifyEmail,
          },
        })

        const verifyEmailLink = `http://localhost:3000/tenant/auth/verify/email/${tokenForVerifyEmail}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/verify.email.html',
          'utf-8',
        )
        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

        await transporter.sendMail({
          to: isTenantExist?.email,
          subject: 'Request Verify Email [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

}

export const verifyEmailRequestTenantService = async ({ email }: Pick<IUser, 'email'>) => {
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        email,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.isVerified)
      throw { msg: 'Email already verified!', status: 406 }

    const tokenForVerifyEmail = await createTokenExpiresIn1H({
      id: isTenantExist.id,
      role: isTenantExist.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.tenant.update({
          where: {
            id: isTenantExist.id,
          },
          data: {
            token: tokenForVerifyEmail,
          },
        })

        let verifyEmailLink, emailBody
        if (isTenantExist?.password) {
          verifyEmailLink = `http://localhost:3000/tenant/auth/verify/email/${tokenForVerifyEmail}`
          emailBody = fs.readFileSync(
            './src/public/body.email/verify.change.email.tenant.html',
            'utf-8',
          )
        } else {
          verifyEmailLink = `http://localhost:3000/tenant/auth/verify/${tokenForVerifyEmail}`
          emailBody = fs.readFileSync(
            './src/public/body.email/verify.email.tenant.html',
            'utf-8',
          )
        }

        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: verifyEmailLink })

        await transporter.sendMail({
          to: email,
          subject: 'Request Verify Email [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

}

export const verifyEmailUserService = async ({ id, token, password } : Pick<IUser, 'id' | 'token' | 'password'>) => {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.token !== token)
      throw { msg: 'Session expired!', status: 406 }

    await prisma.user.update({
      where: {
        id,
        token,
      },
      data: {
        password: await hashPassword(password as string),
        isVerified: true,
        token: '',
      },
    })

}

export const verifyEmailTenantService = async ({ id, token, password } : Pick<IUser, 'id' | 'token' | 'password'>) => {
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }

    const isTokenValid = await prisma.tenant.findUnique({
      where: {
        id,
        token,
      },
    })

    if (!isTokenValid?.id) throw { msg: 'Session expired!', status: 406 }

    await prisma.tenant.update({
      where: {
        id,
        token,
      },
      data: {
        password: await hashPassword(password as string),
        isVerified: true,
        token: '',
      },
    })

}

export const signInWithGoogleService = async ({ email } : Pick<IUser, 'email'>) => {
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        country: true,
      },
    })
    let userData

    if (!checkUser?.id) {
      const newUser = await prisma.user.create({
        data: {
          email,
          isGoogleRegistered: true,
          isVerified: true,
        },
        include: {
          country: true,
        },
      })

      userData = {
        username: newUser?.username,
        role: newUser?.role,
        id: checkUser?.id,
        country: newUser?.country?.name,
        isVerified: newUser?.isVerified,
        isGoogleRegistered: newUser?.isGoogleRegistered,
        profilePictureUrl: newUser?.directory
          ? `http://localhost:5000/api/${newUser.directory}/${newUser.filename}.${newUser.fileExtension}`
          : '',
      }
    } else {
      userData = {
        username: checkUser?.username,
        role: checkUser?.role,
        isVerified: checkUser?.isVerified,
        country: checkUser?.country?.name,
        id: checkUser?.id,
        isGoogleRegistered: checkUser?.isGoogleRegistered,
        profilePictureUrl: checkUser?.directory
          ? `http://localhost:5000/api/${checkUser?.directory}/${checkUser?.filename}/${checkUser?.fileExtension}`
          : '',
      }
    }

    const token = await createToken({
      id: userData?.id as string,
      role: userData?.role as string,
    })

    return {
        token,
        username: userData?.username,
        role: userData?.role,
        isVerified: userData?.isVerified,
        isGoogleRegistered: userData?.isGoogleRegistered,
        profilePictureUrl: userData?.profilePictureUrl,
        country: userData?.country,
      }
}

export const sendEmailResetPasswordUserService = async ({ email } : Pick<IUser, 'email'>) => {
    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
        isGoogleRegistered: false,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (!isUserExist?.isVerified)
      throw { msg: 'Please make request for verify email!', status: 406 }

    const token = await createTokenExpiresIn1H({
      id: isUserExist!.id,
      role: isUserExist!.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.user.update({
          where: {
            email,
          },
          data: {
            token,
          },
        })

        const link = `http://localhost:3000/auth/reset-password/${token}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/reset.password.html',
          'utf-8',
        )
        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: link })

        await transporter.sendMail({
          to: email,
          subject: 'Reset Password [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

    return {
        email,
      }
}

export const sendEmailResetPasswordTenantService = async ({ email } : Pick<IUser, 'email'>) => {
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        email,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (!isTenantExist?.isVerified)
      throw { msg: 'Please make request for verify email!', status: 406 }

    const token = await createTokenExpiresIn1H({
      id: isTenantExist!.id,
      role: isTenantExist!.role,
    })

    await prisma.$transaction(
      async (tx) => {
        await tx.tenant.update({
          where: {
            email,
          },
          data: {
            token,
          },
        })

        const link = `http://localhost:3000/tenant/auth/reset-password/${token}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/reset.password.html',
          'utf-8',
        )
        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({ url: link })

        await transporter.sendMail({
          to: email,
          subject: 'Reset Password [Roomify]',
          html: compiledEmailBody,
        })
      },
      {
        timeout: 25000,
      },
    )

    return {
        email,
      }
}

export const resetPasswordUserService = async ({ password, token, id }: Pick<IUser, 'password' | 'token' | 'id'>) => {
    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
        isGoogleRegistered: false,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.token !== token)
      throw { msg: 'Session expired!', status: 406 }

    const comparedPassword = await comparePassword(
      password as string,
      isUserExist?.password as string,
    )

    if (comparedPassword) throw { msg: 'Password already used!', status: 406 }

    await prisma.user.updateMany({
      where: {
        id,
      },
      data: {
        password: await hashPassword(password as string),
        token: '',
      },
    })

  
}

export const resetPasswordTenantService = async ({ password, token, id }: Pick<IUser, 'password' | 'token' | 'id'>) => {
    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.token !== token)
      throw { msg: 'Session expired!', status: 406 }

    const comparedPassword = await comparePassword(
      password as string,
      isTenantExist?.password as string,
    )

    if (comparedPassword) throw { msg: 'Password already used!', status: 406 }

    await prisma.tenant.updateMany({
      where: {
        id,
      },
      data: {
        password: await hashPassword(password as string),
        token: '',
      },
    })

}

export const keepAuthService = async ({ id, role, token }: Pick<IUser, 'role' | 'token' | 'id'>) => {

    let isAccountExist,
      username,
      profilePictureUrl,
      isVerified,
      country,
      companyName

    if (role === 'USER') {
      isAccountExist = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          country: true,
        },
      })

      if (!isAccountExist?.id || isAccountExist?.deletedAt)
        throw { msg: 'User not found!', status: 406 }

      username = isAccountExist?.username
      country = isAccountExist?.country?.name
      isVerified = isAccountExist?.isVerified
      profilePictureUrl = isAccountExist?.directory
        ? `http://localhost:5000/api/${isAccountExist?.directory}/${isAccountExist?.filename}.${isAccountExist?.fileExtension}`
        : ''
    } else if (role === 'TENANT') {
      isAccountExist = await prisma.tenant.findUnique({
        where: {
          id,
        },
      })

      if (!isAccountExist?.id || isAccountExist?.deletedAt)
        throw { msg: 'Tenant not found!', status: 406 }

      username = isAccountExist?.pic
      isVerified = isAccountExist?.isVerified
      companyName = isAccountExist?.companyName
      country = ''
      profilePictureUrl = isAccountExist?.directory
        ? `http://localhost:5000/api/${isAccountExist?.directory}/${isAccountExist?.filename}.${isAccountExist?.fileExtension}`
        : ''
    } else {
      throw { msg: 'Role unauthorized!', status: 406 }
    }

    return {
        username,
        isVerified,
        role,
        profilePictureUrl,
        country,
        token,
        companyName,
      }
}

export const verifyChangeEmailTenantService = async ({ id, role, token }: Pick<IUser, 'role' | 'token' | 'id'>) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.token !== token)
      throw { msg: 'Session expired!', status: 406 }

    await prisma.tenant.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
        token: '',
      },
    })

}

export const verifyChangeEmailUserService = async ({ id, role, token }: Pick<IUser, 'role' | 'token' | 'id'>) => {

    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.token !== token)
      throw { msg: 'Session expired!', status: 406 }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
        token: '',
      },
    })

}
