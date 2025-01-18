import prisma from '@/prisma'
import { createTokenExpiresIn1H } from '@/utils/jwt'
import { transporter } from '@/utils/transporter'
import { format } from 'date-fns'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { compile } from 'handlebars'
import { IUser } from '../auth.service/types'
import { comparePassword } from '@/utils/hashPassword'

export const getUserProfileService = async ({
  id,
  role,
}: Pick<IUser, 'id' | 'role'>) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      city: true,
      country: true,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  return {
    username: isUserExist?.username,
    phoneNumber: isUserExist?.phoneNumber,
    isVerified: isUserExist?.isVerified,
    email: isUserExist?.email,
    address: isUserExist?.address,
    birthDate: isUserExist?.birthDate,
    year: isUserExist?.birthDate?.getFullYear(),
    month:
      isUserExist?.birthDate?.getMonth() &&
      isUserExist?.birthDate?.getMonth() + 1,
    date: isUserExist?.birthDate?.getDate(),
    gender: isUserExist?.gender,
    cityId: isUserExist?.cityId,
    countryId: isUserExist?.countryId,
    cityName: isUserExist?.city?.name,
    countryName: isUserExist?.country?.name,
    profilePictureUrl: isUserExist?.directory
      ? `http://localhost:5000/api/${isUserExist?.directory}/${isUserExist?.filename}.${isUserExist.fileExtension}`
      : '',
  }
}

export const updateUserProfileService = async ({
  id,
  role,
  email,
  username,
  gender,
  phoneNumber,
  date,
  month,
  year,
  address,
}: Pick<
  IUser,
  'id' | 'role' | 'email' | 'username' | 'phoneNumber' | 'address' | 'gender'
> & { date: number; month: number; year: number }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const updatedUserProfile = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
      gender,
      phoneNumber,
      birthDate:
        year && month && date
          ? new Date(`${year}-${month}-${date}`).toISOString()
          : null,
      address,
    },
  })

  return {
    email: updatedUserProfile?.email,
    username: updatedUserProfile?.username,
    gender: updatedUserProfile?.gender,
    phoneNumber: updatedUserProfile?.phoneNumber,
    birthDate: updatedUserProfile?.birthDate,
    year,
    month,
    date,
    address,
  }
}

export const updateUserProfilePictureService = async ({
  id,
  role,
  imagesUploaded,
}: Pick<IUser, 'id' | 'role'> & { imagesUploaded: any }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      city: true,
      country: true,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const directory = imagesUploaded?.images[0].destination
  let filename = imagesUploaded?.images[0].filename.split('.')[0]
  let fileExtension = imagesUploaded?.images[0].filename.split('.')
  fileExtension = fileExtension[fileExtension.length - 1]

  const updatedUserProfilePicture = await prisma.user.update({
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
    profilePictureUrl: `http://localhost:5000/api/${updatedUserProfilePicture?.directory}/${updatedUserProfilePicture?.filename}.${updatedUserProfilePicture.fileExtension}`,
  }
}

export const updateUserEmailService = async ({
  id,
  role,
  email,
}: Pick<IUser, 'id' | 'role' | 'email'>) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }
  if (isUserExist?.email === email)
    throw {
      msg: 'The new email cannot be the same as your current email!',
      status: 406,
    }

  const token = await createTokenExpiresIn1H({
    id: isUserExist?.id,
    role: isUserExist?.role,
  })

  await prisma.$transaction(
    async (tx) => {
      try {
        const updatedEmail = await tx.user.update({
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
          throw { msg: 'Update user email failed!', status: 500 }

        const link = `http://localhost:3000/auth/verify/email/${token}`

        const emailBody = fs.readFileSync(
          './src/public/body.email/verify.change.email.html',
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

export const deleteUserProfileService = async ({
  id,
  role,
  password
}: Pick<IUser, 'id' | 'role' | 'password' >) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isUserExist?.id || isUserExist?.deletedAt)
    throw { msg: 'User not found!', status: 404 }
  const comparedPassword = await comparePassword(password as string, isUserExist?.password as string)
  if (!comparedPassword)
    throw { msg: 'Password Invalid!', status: 406 }
  if (isUserExist?.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date().toISOString(),
    },
  })
}
