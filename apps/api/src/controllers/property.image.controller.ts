import prisma from '@/prisma'
import { deleteFiles } from '@/utils/deleteFiles'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

export const getPropertyImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params

    const propertyImagesByProperty = await prisma.propertyImage.findMany({
      where: {
        propertyDetail: {
          property: {
            slug,
          },
        },
      },
    })
    if (propertyImagesByProperty.length < 0)
      throw { msg: 'Property images not found!', status: 406 }

    res.status(200).json({
      error: false,
      message: 'Get property images success!',
      data: propertyImagesByProperty,
    })
  } catch (error) {
    console.log(error)
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
      throw { msg: 'Images not found!', status: 406 }
    const imagesUploaded: any = req?.files?.images

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isPropertyExist = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
      include: {
        propertyDetail: true,
      },
    })

    if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
      throw { msg: 'Property not found!', status: 406 }
    if (isPropertyExist?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const dataForCreatePropertyImages = imagesUploaded.map((item: any) => {
      return {
        directory: item?.destination,
        filename: item?.filename.split('.')[0],
        fileExtension: item?.filename.split('.')[1],
        propertyDetailId: isPropertyExist?.propertyDetail?.id,
      }
    })

    const createdPropertyImages = await prisma.propertyImage.createMany({
      data: dataForCreatePropertyImages,
    })

    if (!createdPropertyImages)
      throw { msg: 'Create property images failed!', status: 406 }

    res.status(201).json({
      error: false,
      message: 'Create property images success',
      data: {
        createdPropertyImages,
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

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const getPropertyImage = await prisma.propertyImage.findUnique({
      where: {
        id: Number(propertyImageId),
      },
      include: {
        propertyDetail: {
          include: {
            property: true,
          },
        },
      },
    })

    if (
      !getPropertyImage?.propertyDetail.property?.id ||
      getPropertyImage?.propertyDetail.property?.deletedAt
    )
      throw { msg: 'Property not found!', status: 406 }
    if (getPropertyImage?.propertyDetail.property?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    if (!getPropertyImage?.id)
      throw { msg: 'Property image not found!', status: 406 }

    await prisma.$transaction(
      async (tx) => {
        try {
          const deletedPropertyImage = await tx.propertyImage.delete({
            where: {
              id: Number(propertyImageId),
            },
          })

          fs.rmSync(
            `${getPropertyImage?.directory}/${getPropertyImage?.filename}.${getPropertyImage?.fileExtension}`,
          )
        } catch (error) {
          throw { msg: 'Delete property image failed', status: 500 }
        }
      },
      {
        timeout: 20000,
      },
    )

    res.status(200).json({
      error: false,
      message: 'Delete property image success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
