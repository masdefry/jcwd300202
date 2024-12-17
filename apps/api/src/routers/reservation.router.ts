import { getReservation, updateReservation } from '@/controllers/reservation.controller'
import { verifyToken } from '@/middlewares/verify.token'
import { Router } from 'express'

const reservationRouter = Router()

reservationRouter.get('/all', verifyToken, getReservation)
reservationRouter.post('/all/update', verifyToken, updateReservation)

export default reservationRouter