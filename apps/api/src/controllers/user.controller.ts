import { deleteUserProfileService, getUserProfileService, updateUserEmailService, updateUserProfilePictureService, updateUserProfileService } from '@/services/user.service'
import { NextFunction, Request, Response } from 'express'

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const getUserProfileProcess = await getUserProfileService({ id, role })
    
    res.status(200).json({
      error: false,
      message: 'Get user profile success',
      data: {
        username: getUserProfileProcess?.username,
        phoneNumber: getUserProfileProcess?.phoneNumber,
        isVerified: getUserProfileProcess?.isVerified,
        email: getUserProfileProcess?.email,
        address: getUserProfileProcess?.address,
        birthDate: getUserProfileProcess?.birthDate,
        year: getUserProfileProcess?.year,
        month:getUserProfileProcess?.month,
        date: getUserProfileProcess?.date,
        gender: getUserProfileProcess?.gender,
        cityId: getUserProfileProcess?.cityId,
        countryId: getUserProfileProcess?.countryId,
        cityName:getUserProfileProcess?.cityName,
        countryNamcityNamee: getUserProfileProcess?.countryName,
        profilePictureUrl: getUserProfileProcess?.profilePictureUrl,
      },
    })

  } catch (error) {
    next(error)
  }
}

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
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
    } = req.body

    const updateUserProfileProcess = await updateUserProfileService({ id, role, email, username, gender, phoneNumber, date, month, year, address, })
   
    res.status(200).json({
      error: false,
      message: 'Update user profile success',
      data: {
        email: updateUserProfileProcess?.email,
        username: updateUserProfileProcess?.username,
        gender: updateUserProfileProcess?.gender,
        phoneNumber: updateUserProfileProcess?.phoneNumber,
        birthDate: updateUserProfileProcess?.birthDate,
        year: updateUserProfileProcess?.year,
        month: updateUserProfileProcess?.month,
        date: updateUserProfileProcess?.date,
        address: updateUserProfileProcess?.address,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const imagesUploaded: any = req.files

    const updateUserProfilePictureProcess = await updateUserProfilePictureService({ id, role, imagesUploaded })

    res.status(200).json({
      error: false,
      message: 'Update user profile picture success',
      data: {
        profilePictureUrl: updateUserProfilePictureProcess?.profilePictureUrl
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, email } = req.body

    const updateUserEmailProcess = await updateUserEmailService({ id, role, email })
    
    res.status(200).json({
      error: false,
      message: 'Update user email success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, password } = req.body

    const deleteUserProfileProcess = await deleteUserProfileService({ id, role, password })
    
    res.status(200).json({
      error: false,
      message: 'Delete account success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
