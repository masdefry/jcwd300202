import {
  createPropertyImagesByPropertyService,
  deletePropertyImagesByPropertyService,
  getPropertyImagesByPropertyService,
} from '@/services/property.image.service'
import { deleteFiles } from '@/utils/deleteFiles'
import { Request, Response, NextFunction } from 'express'

export const getPropertyImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

    const getPropertyImagesByPropertyProcess =
      await getPropertyImagesByPropertyService({ slug, id, role })

    res.status(200).json({
      error: false,
      message: 'Get property images success!',
      data: getPropertyImagesByPropertyProcess?.propertyImagesByProperty,
    })
  } catch (error) {
    next(error)
  }
}

export const createPropertyImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params
    if (Array.isArray(req.files))
      throw { msg: 'Images not found!', status: 404 }
    const imagesUploaded: any = req?.files?.images

    const createPropertyImagesByPropertyProcess =
      await createPropertyImagesByPropertyService({
        id,
        role,
        slug,
        imagesUploaded,
      })

    res.status(201).json({
      error: false,
      message: 'Create property images success',
      data: {
        createdPropertyImages:
          createPropertyImagesByPropertyProcess?.createdPropertyImages,
      },
    })
  } catch (error) {
    if (!Array.isArray(req.files)) {
      deleteFiles({ imagesUploaded: req.files })
    }
    next(error)
  }
}

export const deletePropertyImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { propertyImageId } = req.params

    const deletedPropertyImagesByPropertyProcess =
      await deletePropertyImagesByPropertyService({ id, role, propertyImageId })

    res.status(200).json({
      error: false,
      message: 'Delete property image success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
