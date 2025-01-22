import prisma from '@/prisma'
import { Request, Response, NextFunction } from 'express'
import { IUser } from '../auth.service/types'
import { IProperty } from '../property.service/types'

export const getPropertyHasFacilitiesService = async ({
  id,
  role,
  slug,
  name,
}: Pick<IUser, 'id' | 'role'> & Pick<IProperty, 'slug' | 'name'>) => {
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
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id) {
    throw { msg: 'Actions not permitted!', status: 403 }
  }

  const propertyHasFacility = await prisma.propertyHasFacility.findMany({
    where: {
      AND: [
        {
          property: {
            slug,
            tenantId: id,
          },
        },
        {
          propertyFacility: {
            name: {
              contains: name as string,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      propertyFacility: true,
    },
    orderBy: {
      propertyFacility: {
        name: 'asc',
      },
    },
  })

  const propertyNotHasFacility = await prisma.propertyFacility.findMany({
    where: {
      id: {
        notIn: propertyHasFacility?.map((item) => item?.propertyFacilityId),
      },
      name: {
        contains: name as string,
        mode: 'insensitive',
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return {
    propertyHasFacility,
    propertyNotHasFacility,
    propertyFacilitiesId: propertyHasFacility.map(
      (item) => item?.propertyFacilityId,
    ),
    property: isPropertyExist,
  }
}

export const updatePropertyHasFacilitiesService = async ({
  propertyFacilitiesId,
  id,
  role,
  slug,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & { propertyFacilitiesId: any }) => {
  if (!Array.isArray(propertyFacilitiesId))
    throw { msg: 'Property facilities id invalid!', status: 406 }

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

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let dataCreateManyPropertyHasFacilities
  await prisma.$transaction(
    async (tx) => {
      const deletePropertyHasFacilities =
        await tx.propertyHasFacility.deleteMany({
          where: {
            propertyId: isPropertyExist?.id,
          },
        })

      dataCreateManyPropertyHasFacilities = propertyFacilitiesId.map(
        (itm: string | number) => {
          return {
            propertyId: isPropertyExist?.id,
            propertyFacilityId: Number(itm),
          }
        },
      )

      const createPropertyHasFacilities =
        await tx.propertyHasFacility.createMany({
          data: dataCreateManyPropertyHasFacilities,
        })

      if (!createPropertyHasFacilities)
        throw { msg: 'Update property facility failed!', status: 500 }
    },
    {
      timeout: 15000,
    },
  )

  return { dataCreateManyPropertyHasFacilities }
}
