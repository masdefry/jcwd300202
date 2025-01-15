import { createUserHistoryViewService } from '@/services/history.service'
import { NextFunction, Request, Response } from 'express'
export const createUserHistoryView = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, role } = req.body
    const { slug } = req.params

    const createdUserHistoryViewProcess = await createUserHistoryViewService({ id, role, slug })
   
    res.status(201).json({
      error: false,
      message: 'Create user history view success',
      data: createdUserHistoryViewProcess?.data,
    })
  } catch (error) {
    next(error)
  }
}
