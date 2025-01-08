import prisma from '@/prisma'
import { NextFunction, Request, Response } from 'express'

// export const getHistoryView = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id, role } = req.body

//         const isUserExist = await prisma.user.findUnique({
//             where: {
//                 id
//             }
//         })

//         if(!isUserExist?.id || isUserExist?.deletedAt) throw { msg: 'User not found!', status: 406 }
//         if(isUserExist?.role !== role) throw { msg: 'Role unauthorized!', status: 401 }
//         if(!isUserExist?.isVerified) throw { msg: 'User not verified!', status: 406 }

//         const userHistoryViews = await prisma.historyView.findMany({
//             where: {
//                 userId: id
//             },
//             include : {
//                 property: {
//                     include: {
//                         propertyDetail: {
//                             include: {
//                                 propertyImage: true
//                             }
//                         }
//                     }
//                 }
//             }
//         })
//     } catch (error) {
//         next(error)
//     }
// }

export const createUserHistoryView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

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
      },
    })

    if (!getProperty?.id) throw { msg: 'Property not found!', status: 406 }

    const createdUserHistoryView = await prisma.historyView.create({
      data: {
        userId: id,
        propertyId: getProperty?.id,
      },
    })

    res.status(201).json({
      error: false,
      message: 'Create user history view success',
      data: createdUserHistoryView,
    })
  } catch (error) {
    next(error)
  }
}
