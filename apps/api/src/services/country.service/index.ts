import prisma from '@/prisma'
import { ICountry } from './types'
import { IUser } from '../auth.service/types'

export const getCountriesService = async ({
  countryName,
  limit,
}: Pick<ICountry, 'countryName'> & { limit: string | number }) => {
  const countries = await prisma.country.findMany({
    where: {
      name: {
        contains: countryName as string,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
    take: Number(limit),
  })

  return {
    countries,
  }
}

export const createCountryService = async ({
  name,
  description,
  id,
  role,
  imagesUploaded,
}: Pick<ICountry, 'name' | 'imagesUploaded' | 'description'> &
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

    const isCountryExist = await prisma.country.findFirst({
      where : {
        name: {
          equals: name,
          mode: 'insensitive'
        },
      }
    })
  
    if(isCountryExist?.id) throw { msg: 'Country already exist', status: 406 }


  const createdCountry = await prisma.country.create({
    data: {
      name: name,
      description,
      directory: imagesUploaded[0].destination,
      filename: imagesUploaded[0].filename.split('.')[0],
      fileExtension: imagesUploaded[0].filename.split('.')[0],
    },
  })

  if (!createdCountry?.id) throw { msg: 'Create country failed!', status: 500 }

  return {
    createdCountry,
  }
}
