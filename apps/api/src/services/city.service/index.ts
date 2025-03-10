import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'
import { ICIty } from './types'
import { IUser } from '../auth.service/types'

export const getCitiesService = async ({
  cityName,
  limit,
}: {
  cityName: string
  limit: string | number
}) => {
  const cities = await prisma.city.findMany({
    where: {
      name: {
        contains: cityName as string,
        mode: 'insensitive',
      },
    },
    include: {
      country: true
    },
    orderBy: {
      name: 'asc',
    },
    take: Number(limit),
  })

  return {
    cities,
  }
}

export const createCityService = async ({
  cityName,
  countryId,
  id,
  role,
  imagesUploaded,
}: Pick<ICIty, 'cityName' | 'countryId' | 'imagesUploaded'> &
  Pick<IUser, 'id' | 'role'>) => {
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
  if (!isTenantExist?.isVerified)
    throw { msg: 'Tenant not verified!', status: 406 }

  const isCityExist = await prisma.city.findFirst({
    where : {
      name: {
        equals: cityName,
        mode: 'insensitive'
      },
      countryId: Number(countryId)
    }
  })

  if(isCityExist?.id) throw { msg: 'City already exist', status: 406 }

  const createdCity = await prisma.city.create({
    data: {
      name: cityName,
      countryId: Number(countryId),
      directory: imagesUploaded[0].destination,
      filename: imagesUploaded[0].filename.split('.')[0],
      fileExtension: imagesUploaded[0].filename.split('.')[0],
    },
  })

  if (!createdCity?.id) throw { msg: 'Create city failed!', status: 500 }

  return {
    createdCity,
  }
}
