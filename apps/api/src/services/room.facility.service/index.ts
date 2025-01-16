import { Request, Response, NextFunction } from 'express'
import prisma from '@/prisma'
import { IUser } from '../auth.service/types'
import { IPropertyRoomFacility } from './types'

export const getPropertyRoomFacilityService = async ({ name }: Pick<IPropertyRoomFacility, 'name'>) => {
 
    const propertyRoomFacility = await prisma.propertyRoomFacility.findMany({
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

    return{ propertyRoomFacility }
    
}

export const createPropertyRoomFacilityService = async ({ id, role, name, imagesUploaded }: Pick<IUser, 'id' | 'role'> & Pick<IPropertyRoomFacility, 'name'> & { imagesUploaded: any}) => {

    const isTenantExist = await prisma.tenant.findUnique({
      where: {
        id,
        deletedAt: null
      },
    })

    if (!isTenantExist?.id || isTenantExist?.deletedAt)
      throw { msg: 'Tenant not found!', status: 406 }
    if (isTenantExist.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const isFacilityExist = await prisma.propertyRoomFacility.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })

    if (isFacilityExist.length > 0)
      throw { msg: 'Room facility already exist!', status: 406 }
    
    const createdPropertyRoomFacility =
      await prisma.propertyRoomFacility.create({
        data: {
          name,
          iconDirectory: imagesUploaded[0].destination,
          iconFilename: imagesUploaded[0].filename.split('.')[0],
          iconFileExtension: imagesUploaded[0].filename.split('.')[1],
        },
      })

    if (!createdPropertyRoomFacility?.id)
      throw { msg: 'Create room facility failed!', status: 500 }

    return{ createdPropertyRoomFacility }
    
}
