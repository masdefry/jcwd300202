import { getReservation, getReservationById, updateReservation } from '@/controllers/reservation.controller'
import { tenantRoleValidation } from "@/middlewares/tenant.role.validation";
import { verifyToken } from '@/middlewares/verify.token'
import { Router } from 'express'

const reservationRouter = Router()

reservationRouter.get('/all', verifyToken, tenantRoleValidation, getReservation)
reservationRouter.post('/update', verifyToken, tenantRoleValidation, updateReservation)
reservationRouter.get('/:id', verifyToken, tenantRoleValidation, getReservationById)

export default reservationRouter