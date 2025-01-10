import { createPropertyRoomType, getPropertyRoomType, getPropertyRoomTypeByProperty, updatePropertyRoomTypeGeneral } from '@/controllers/property.room.type.controller'
import { uploader } from '@/middlewares/uploader'
import { verifyToken } from '@/middlewares/verify.token'
import { Router } from 'express'

const roomTypeRouter = Router()

roomTypeRouter.get('/:id', getPropertyRoomType)
roomTypeRouter.get('/property/:slug/search', getPropertyRoomTypeByProperty)
roomTypeRouter.patch('/property/:slug', verifyToken, updatePropertyRoomTypeGeneral)
roomTypeRouter.post('/property/:slug', verifyToken, uploader, createPropertyRoomType)

export default roomTypeRouter