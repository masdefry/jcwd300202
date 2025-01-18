import { decodeToken } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1]

    if (!token) throw { msg: 'Token not found!', status: 404 }
    const decodedToken: JwtPayload | string = (await decodeToken(
      token,
    )) as JwtPayload

    req.body!.id = decodedToken?.data?.id
    req.body!.role = decodedToken?.data?.role
    req.body!.token = token

    next()
  } catch (error) {
    next(error)
  }
}
