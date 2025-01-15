import prisma from '@/prisma'
import { createTokenExpiresIn1H } from '@/utils/jwt'
import { transporter } from '@/utils/transporter'
import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { compile } from 'handlebars'
import { ITenant } from './types'

export const getTenantProfileService = async ({ id, role }: Pick<ITenant, 'id' | 'role'>) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    
      return {
        pic: isTenantExist?.pic,
        phoneNumber: isTenantExist?.phoneNumber,
        isVerified: isTenantExist?.isVerified,
        companyName: isTenantExist?.companyName,
        email: isTenantExist?.email,
        address: isTenantExist?.address,
        profilePictureUrl: isTenantExist?.directory
          ? `http://localhost:5000/api/${isTenantExist?.directory}/${isTenantExist?.filename}.${isTenantExist.fileExtension}`
          : '',
      }
}

export const updateTenantProfileService = async ({ id, role, email, pic, phoneNumber, companyName, address }: Pick<ITenant, 'id' | 'role' | 'email' | 'pic' | 'phoneNumber' | 'companyName' | 'address' >) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const updatedTenantProfile = await prisma.tenant.update({
      where: {
        id,
      },
      data: {
        pic,
        phoneNumber,
        address,
        companyName,
      },
    })

    
      return {
        email: updatedTenantProfile?.email,
        pic: updatedTenantProfile?.pic,
        phoneNumber: updatedTenantProfile?.phoneNumber,
        address: updatedTenantProfile?.address,
        companyName: updatedTenantProfile?.companyName,
      }
}

export const updateTenantProfilePictureService = async ({ id, role, imagesUploaded }: Pick<ITenant, 'id' | 'role'> & { imagesUploaded: any } ) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const directory = imagesUploaded?.images[0].destination
    let filename = imagesUploaded?.images[0].filename.split('.')[0]
    let fileExtension = imagesUploaded?.images[0].filename.split('.')
    fileExtension = fileExtension[fileExtension.length - 1]

    const updatedTenantProfilePicture = await prisma.tenant.update({
      where: {
        id,
      },
      data: {
        filename,
        directory,
        fileExtension,
      },
    })

    
      return {
        profilePictureUrl: `http://localhost:5000/api/${updatedTenantProfilePicture?.directory}/${updatedTenantProfilePicture?.filename}.${updatedTenantProfilePicture.fileExtension}`,
      }
}

export const updateTenantEmailService = async ({ id, role, email }: Pick<ITenant, 'id' | 'role' | 'email'>) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }
    if (isTenantExist?.email === email)
      throw {
        msg: 'The new email cannot be the same as your current email!',
        status: 406,
      }

    const token = await createTokenExpiresIn1H({
      id: isTenantExist?.id,
      role: isTenantExist?.role,
    })

    await prisma.$transaction(
      async (tx) => {
        try {
          const updatedEmail = await tx.tenant.update({
            where: {
              id,
            },
            data: {
              email,
              isVerified: false,
              token,
            },
          })

          if (!updatedEmail?.email)
            throw { msg: 'Update tenant email failed!', status: 500 }

          const link = `http://localhost:3000/tenant/auth/verify/email/${token}`

          const emailBody = fs.readFileSync(
            './src/public/body.email/verify.change.email.tenant.html',
            'utf-8',
          )
          let compiledEmailBody: any = await compile(emailBody)
          compiledEmailBody = compiledEmailBody({ url: link })

          await transporter.sendMail({
            to: email,
            subject: 'Verify New Email [Roomify]',
            html: compiledEmailBody,
          })
        } catch (err) {
          throw { msg: 'Send email for verification failed!', status: 500 }
        }
      },
      {
        timeout: 50000,
      },
    )

    
      return {
        email,
      }
}

export const deleteTenantProfileService = async ({ id, role }: Pick<ITenant, 'id' | 'role'>) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    await prisma.tenant.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    })

}
