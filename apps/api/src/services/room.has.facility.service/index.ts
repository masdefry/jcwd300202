import prisma from '@/prisma'
import { Request, Response, NextFunction } from 'express'
import { IUser } from '../auth.service/types'
import { IProperty } from '../property.service/types'
import { IRoomHasFacilities } from './types'
import { IPropertyRoomFacility } from '../room.facility.service/types'

export const getRoomHasFacilitiesService = async ({
  id,
  role,
  propertyRoomTypeId,
  name,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IRoomHasFacilities, 'propertyRoomTypeId'> &
  Pick<IPropertyRoomFacility, 'name'>) => {
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

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
    include: {
      property: true
    }
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room not found!', status: 404 }
  if (isPropertyRoomTypeExist?.property?.tenantId !== id) {
    throw { msg: 'Actions not permitted!', status: 403 }
  }

  const roomHasFacilities = await prisma.roomHasFacilities.findMany({
    where: {
      AND: [
        {
          propertyRoomTypeId: Number(propertyRoomTypeId),
        },
        {
          propertyRoomType: {
            deletedAt: null,
          },
        },
        {
          propertyRoomFacility: {
            name: {
              contains: name as string,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      propertyRoomFacility: true,
    },
    orderBy: {
      propertyRoomFacility: {
        name: 'asc',
      },
    },
  })

  const roomNotHasFacilities = await prisma.propertyRoomFacility.findMany({
    where: {
      id: {
        notIn: roomHasFacilities?.map((item) => item?.propertyRoomFacilityId),
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

  const property = await prisma.property.findUnique({
    where: {
      id: isPropertyRoomTypeExist?.propertyId,
    },
    include: {
      propertyRoomType: {
        where: {
          deletedAt: null,
        },
      },
    },
  })
  return {
    roomHasFacilities,
    roomNotHasFacilities,
    propertyRoomFacilitiesId: roomHasFacilities.map(
      (item) => item?.propertyRoomFacilityId,
    ),
    propertyRoomType: isPropertyRoomTypeExist,
    property,
  }
}
export const getGeneralRoomHasFacilitiesByPropertyService = async ({
  id,
  role,
  slug,
  name,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IPropertyRoomFacility, 'name'> &
  Pick<IProperty, 'slug'>) => {
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
    include: {
      propertyRoomType: {
        where: {
          deletedAt: null,
        },
      },
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  const getRoomHasFacilitiesId = await prisma.roomHasFacilities.findMany({
    where: {
      AND: [
        {
          propertyRoomType: {
            property: {
              slug,
            },
            deletedAt: null,
          },
        },
        {
          propertyRoomFacility: {
            name: {
              contains: name as string,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      propertyRoomFacility: true,
    },
  })

  const roomHasFacilities = await prisma.propertyRoomFacility.findMany({
    where: {
      id: {
        in: getRoomHasFacilitiesId?.map((item) => item?.propertyRoomFacilityId),
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

  const roomNotHasFacilities = await prisma.propertyRoomFacility.findMany({
    where: {
      id: {
        notIn: getRoomHasFacilitiesId?.map(
          (item) => item?.propertyRoomFacilityId,
        ),
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
    roomHasFacilities,
    roomNotHasFacilities,
    propertyRoomFacilitiesId: roomHasFacilities.map((item) => item?.id),
    property: isPropertyExist,
  }
}

export const updateRoomHasFacilitiesService = async ({
  propertyRoomFacilitiesId,
  id,
  role,
  propertyRoomTypeId,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IRoomHasFacilities, 'propertyRoomTypeId'> & {
    propertyRoomFacilitiesId: any
  }) => {
  if (!Array.isArray(propertyRoomFacilitiesId))
    throw { msg: 'Room facilities id invalid!', status: 406 }

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

  const isPropertyRoomTypeExist = await prisma.propertyRoomType.findUnique({
    where: {
      id: Number(propertyRoomTypeId),
      deletedAt: null,
    },
    include: {
      property: true,
    },
  })

  if (!isPropertyRoomTypeExist?.id || isPropertyRoomTypeExist?.deletedAt)
    throw { msg: 'Room not found!', status: 404 }
  if (isPropertyRoomTypeExist?.property?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let dataCreateManyRoomHasFacilities
  await prisma.$transaction(
    async (tx) => {
      const deleteRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
        where: {
          propertyRoomTypeId: isPropertyRoomTypeExist?.id,
        },
      })

      dataCreateManyRoomHasFacilities = propertyRoomFacilitiesId.map(
        (itm: string | number) => {
          return {
            propertyRoomTypeId: isPropertyRoomTypeExist?.id,
            propertyRoomFacilityId: Number(itm),
          }
        },
      )

      const createRoomHasFacilities = await tx.roomHasFacilities.createMany({
        data: dataCreateManyRoomHasFacilities,
      })

      if (!createRoomHasFacilities)
        throw { msg: 'Update room facility failed!', status: 500 }
    },
    {
      timeout: 15000,
    },
  )

  return { dataCreateManyRoomHasFacilities }
}
export const updateRoomHasFacilitiesByPropertyService = async ({
  propertyRoomFacilitiesId,
  id,
  role,
  slug,
}: Pick<IUser, 'id' | 'role'> &
  Pick<IProperty, 'slug'> & { propertyRoomFacilitiesId: any }) => {
  if (!Array.isArray(propertyRoomFacilitiesId))
    throw { msg: 'Room facilities id invalid!', status: 406 }

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

  const isPropertyExist = await prisma.property.findUnique({
    where: {
      slug,
      deletedAt: null,
    },
    include: {
      propertyRoomType: true,
    },
  })

  if (!isPropertyExist?.id || isPropertyExist?.deletedAt)
    throw { msg: 'Property not found!', status: 404 }
  if (isPropertyExist?.tenantId !== id)
    throw { msg: 'Actions not permitted!', status: 403 }

  let dataCreateManyRoomHasFacilities
  await prisma.$transaction(
    async (tx) => {
      const deleteRoomHasFacilities = await tx.roomHasFacilities.deleteMany({
        where: {
          propertyRoomTypeId: {
            in: isPropertyExist?.propertyRoomType.map((item) => item?.id),
          },
        },
      })

      const dataCreateManyRoomHasFacilities = isPropertyExist?.propertyRoomType
        .map((item) => {
          return propertyRoomFacilitiesId.map((itm: string | number) => {
            return {
              propertyRoomTypeId: item?.id,
              propertyRoomFacilityId: Number(itm),
            }
          })
        })
        .flat()

      const createRoomHasFacilities = await tx.roomHasFacilities.createMany({
        data: dataCreateManyRoomHasFacilities,
      })

      if (!createRoomHasFacilities)
        throw { msg: 'Update room facility failed!', status: 500 }
    },
    {
      timeout: 15000,
    },
  )

  return { dataCreateManyRoomHasFacilities }
}
