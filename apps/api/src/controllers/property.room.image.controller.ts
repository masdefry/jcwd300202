import prisma from '@/prisma'
import { deleteFiles } from '@/utils/deleteFiles'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

export const getPropertyRoomImagesByProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { roomId } = req.params

    const propertyRoomImagesByProperty =
      await prisma.propertyRoomImage.findMany({
        where: {
          propertyRoomType: {
            id: Number(roomId),
          },
        },
      })

    if (propertyRoomImagesByProperty.length < 0)
      throw { msg: 'Room images not found!', status: 406 }

    res.status(200).json({
      error: false,
      message: 'Get room images success!',
      data: propertyRoomImagesByProperty,
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

    const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
      where: {
        id: Number(roomId),
      },
      include: {
        property: {
          include: {
            propertyDetail: true,
          },
        },
      },
    })

    if (
      !isPropertyRoomTypeExist?.property?.id ||
      isPropertyRoomTypeExist?.property?.deletedAt
    )
      throw { msg: 'Property room type not found!', status: 406 }
    if (isPropertyRoomTypeExist?.property?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    const dataForCreatePropertyRoomImages = imagesUploaded.map((item: any) => {
      return {
        directory: item?.destination,
        filename: item?.filename.split('.')[0],
        fileExtension: item?.filename.split('.')[1],
        propertyRoomTypeId: isPropertyRoomTypeExist?.id,
      }
    })

    const createdPropertyRoomImages = await prisma.propertyRoomImage.createMany(
      {
        data: dataForCreatePropertyRoomImages,
      },
    )

    if (!createdPropertyRoomImages)
      throw { msg: 'Create room images failed!', status: 406 }

    res.status(201).json({
      error: false,
      message: 'Create room images success',
      data: {
        createdPropertyRoomImages,
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

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const getPropertyRoomImage = await prisma.propertyRoomImage.findUnique({
      where: {
        id: Number(propertyRoomImageId),
      },
      include: {
        propertyRoomType: {
          include: {
            property: {
              include: {
                propertyDetail: {
                  include: {
                    property: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (
      !getPropertyRoomImage?.propertyRoomType?.id ||
      getPropertyRoomImage?.propertyRoomType?.deletedAt
    )
      throw { msg: 'Property room type not found!', status: 406 }
    if (getPropertyRoomImage?.propertyRoomType?.property?.tenantId !== id)
      throw { msg: 'Actions not permitted!', status: 406 }

    if (!getPropertyRoomImage?.propertyRoomType?.property?.id)
      throw { msg: 'Room image not found!', status: 406 }

    await prisma.$transaction(
      async (tx) => {
        try {
          const deletedPropertyRoomImage = await tx.propertyRoomImage.delete({
            where: {
              id: Number(propertyRoomImageId),
            },
          })

          fs.rmSync(
            `${getPropertyRoomImage?.directory}/${getPropertyRoomImage?.filename}.${getPropertyRoomImage?.fileExtension}`,
          )
        } catch (error) {
          throw { msg: 'Delete room image failed', status: 500 }
        }
      },
      {
        timeout: 20000,
      },
    )

    res.status(200).json({
      error: false,
      message: 'Delete room image success',
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
