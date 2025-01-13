import { NextFunction, Request, Response } from 'express'

export const tenantRoleValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role } = req.body

    if (role !== 'TENANT') throw { msg: 'Role unauthorized!', status: 401 }

    next()
  } catch (error) {
    next(error)
  }
}
