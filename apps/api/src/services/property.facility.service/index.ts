import { Request, Response, NextFunction } from 'express'
import prisma from '@/prisma'
import { IUser } from '../auth.service/types'

export const getPropertyFacilityService = async ({
  name,
}: {
  name: string
}) => {
  const propertyFacility = await prisma.propertyFacility.findMany({
    where: {
      name: {
        contains: name as string,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return { propertyFacility }
}

export const createPropertyFacilityService = async ({
  id,
  role,
  name,
  imagesUploaded,
}: Pick<IUser, 'id' | 'role'> & { imagesUploaded: any; name: string }) => {
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

  const isFacilityExist = await prisma.propertyFacility.findMany({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  })

  if (isFacilityExist.length > 0)
    throw { msg: 'Property facility already exist!', status: 406 }

  const createdPropertyFacility = await prisma.propertyFacility.create({
    data: {
      name,
      iconDirectory: imagesUploaded[0].destination,
      iconFilename: imagesUploaded[0].filename.split('.')[0],
      iconFileExtension: imagesUploaded[0].filename.split('.')[1],
    },
  })

  if (!createdPropertyFacility?.id)
    throw { msg: 'Create property facility failed!', status: 500 }

  return { createdPropertyFacility }
}
