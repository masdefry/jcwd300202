import prisma from '@/prisma'
import { IUser } from '../auth.service/types'
import { IProperty } from '../property.service/types'
export const createUserHistoryViewService = async ({ id, role, slug }: Pick<IUser, 'id' | 'role'> & Pick<IProperty, 'slug'>) => {

    const isUserExist = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!isUserExist?.id || isUserExist?.deletedAt)
      throw { msg: 'User not found!', status: 406 }
    if (isUserExist?.role !== role)
      throw { msg: 'Role unauthorized!', status: 401 }

    const getProperty = await prisma.property.findFirst({
      where: {
        slug,
        deletedAt: null
      },
    })

    if (!getProperty?.id) throw { msg: 'Property not found!', status: 406 }

    const createdUserHistoryView = await prisma.historyView.create({
      data: {
        userId: id,
        propertyId: getProperty?.id,
      },
    })

    return {
        createdUserHistoryView,
    }

}
