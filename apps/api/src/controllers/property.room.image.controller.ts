import prisma from '@/prisma'
import {
  createPropertyRoomImagesByPropertyService,
  deletePropertyRoomImagesByPropertyService,
  getPropertyRoomImagesByPropertyService,
} from '@/services/property.room.images.service'
import { deleteFiles } from '@/utils/deleteFiles'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

export const getPropertyRoomImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role} = req.body
    const { roomId } = req.params

    const getPropertyRoomImagesByPropertyProcess =
      await getPropertyRoomImagesByPropertyService({ roomId, id, role })

    res.status(200).json({
      error: false,
      message: 'Get room images success!',
      data: getPropertyRoomImagesByPropertyProcess?.propertyRoomImagesByProperty,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const createPropertyRoomImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { roomId } = req.params
    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 404 }
    const imagesUploaded: any = req?.files?.images

    const createPropertyRoomImagesByPropertyProcess =
      await createPropertyRoomImagesByPropertyService({
        id,
        role,
        roomId,
        imagesUploaded,
      })

    res.status(201).json({
      error: false,
      message: 'Create room images success',
      data: {
        createdPropertyRoomImages:
          createPropertyRoomImagesByPropertyProcess?.createdPropertyRoomImages,
      },
    })
  } catch (error) {
    if (!Array.isArray(req.files)) {
      deleteFiles({ imagesUploaded: req.files })
    }
    next(error)
  }
}

export const deletePropertyRoomImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { propertyRoomImageId } = req.params

    const deletePropertyRoomImagesByPropertyProcess =
      await deletePropertyRoomImagesByPropertyService({ id, role, propertyRoomImageId })

    res.status(200).json({
      error: false,
      message: 'Delete room image success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
