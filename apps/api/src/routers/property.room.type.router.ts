import { createPropertyRoomType, deletePropertyRoomType, getPropertyRoomType, getPropertyRoomTypeByProperty, updatePropertyRoomTypeGeneral } from '@/controllers/property.room.type.controller'
import { uploader } from '@/middlewares/uploader'
import { createPropertyRoomTypeValidator, deletePropertyValidator, updatePropertyRoomTypeGeneralValidator } from '@/middlewares/validator'
import { verifyToken } from '@/middlewares/verify.token'
import { Router } from 'express'

const roomTypeRouter = Router()

roomTypeRouter.get('/:id', getPropertyRoomType)
roomTypeRouter.get('/property/:slug/search', getPropertyRoomTypeByProperty)
roomTypeRouter.patch('/property/:slug', verifyToken, updatePropertyRoomTypeGeneralValidator, updatePropertyRoomTypeGeneral)
roomTypeRouter.patch('/delete/:slug', verifyToken, deletePropertyValidator,  deletePropertyRoomType)
roomTypeRouter.post('/property/:slug', verifyToken, uploader, createPropertyRoomTypeValidator, createPropertyRoomType)

export default roomTypeRouter