import prisma from '@/prisma'
import { deleteFiles } from '@/utils/deleteFiles'
import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { IUser } from '../auth.service/types'
import { IProperty } from '../property.service/types'

export const getPropertyImagesByPropertyService = async ({
  id,
  role,
  slug,
}: Pick<IUser, 'role' | 'id'> & Pick<IProperty, 'slug'>) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }
  
  const propertyImagesByProperty = await prisma.propertyImage.findMany({
    where: {
      propertyDetail: {
        property: {
          slug,
        },
      },
    },
    include: {
      propertyDetail: {
        include: {
          property: true
        }
      }
    }
  })
  if (propertyImagesByProperty.length < 0)
    throw { msg: 'Property images not found!', status: 404 }
  if (propertyImagesByProperty[0]?.propertyDetail?.property?.tenantId !== id) {
    throw { msg: 'Actions not permitted!', status: 403 }
  }

  return { propertyImagesByProperty }
}

export const createPropertyImagesByPropertyService = async ({
  id,
  role,
  slug,
  imagesUploaded,
}: Pick<IUser, 'role' | 'id'> &
  Pick<IProperty, 'slug'> & { imagesUploaded: any }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
  if (isTenantExist.role !== role)
    throw { msg: 'Role unauthorized!', status: 401 }

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyDetail: true,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

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

  return {
    createdPropertyImages,
  }
}

export const deletePropertyImagesByPropertyService = async ({
  id,
  role,
  propertyImageId,
}: Pick<IUser, 'role' | 'id'> & { propertyImageId: string | number }) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: {
      id,
      deletedAt: null,
    },
  })

  if (!isTenantExist?.id || isTenantExist?.deletedAt)
    throw { msg: 'Tenant not found!', status: 404 }
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
    throw { msg: 'Property not found!', status: 404 }
  if (getPropertyImage?.propertyDetail.property?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  if (!getPropertyImage?.id)
    throw { msg: 'Property image not found!', status: 404 }

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
}
