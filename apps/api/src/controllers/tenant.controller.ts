import { deleteTenantProfileService, getTenantProfileService, updateTenantEmailService, updateTenantProfilePictureService, updateTenantProfileService } from '@/services/tenant.service'
import { NextFunction, Request, Response } from 'express'

export const getTenantProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const getTenantProfileProcess = await getTenantProfileService({ id, role })

    res.status(200).json({
      error: false,
      message: 'Get Tenant profile success',
      data: {
        pic: getTenantProfileProcess?.pic,
        phoneNumber: getTenantProfileProcess?.phoneNumber,
        isVerified: getTenantProfileProcess?.isVerified,
        companyName: getTenantProfileProcess?.companyName,
        email: getTenantProfileProcess?.email,
        address: getTenantProfileProcess?.address,
        profilePictureUrl: getTenantProfileProcess?.profilePictureUrl,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateTenantProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, email, pic, phoneNumber, companyName, address } = req.body

    const updateTenantProfileProcess = await updateTenantProfileService({ id, role, email, pic, phoneNumber, companyName, address })
    
    res.status(200).json({
      error: false,
      message: 'Update Tenant profile success',
      data: {
        email: updateTenantProfileProcess?.email,
        pic: updateTenantProfileProcess?.pic,
        phoneNumber: updateTenantProfileProcess?.phoneNumber,
        address: updateTenantProfileProcess?.address,
        companyName: updateTenantProfileProcess?.companyName,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateTenantProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const imagesUploaded: any = req.files

    const updateTenantProfilePictureProcess = await updateTenantProfilePictureService({id, role, imagesUploaded})

    res.status(200).json({
      error: false,
      message: 'Update Tenant profile picture success',
      data: {
        profilePictureUrl: updateTenantProfilePictureProcess?.profilePictureUrl
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateTenantEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role, email } = req.body

    const updateTenantEmailProcess = await updateTenantEmailService({ id, role, email })
   
    res.status(200).json({
      error: false,
      message: 'Update tenant email success',
      data: {
        email,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTenantProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body

    const deleteTenantProfileProcess = await deleteTenantProfileService({id, role})
  
    res.status(200).json({
      error: false,
      message: 'Delete account success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
