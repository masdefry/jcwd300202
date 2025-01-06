import { getPropertyRoomType, getPropertyRoomTypeByProperty } from '@/controllers/property.room.type.controller'
import { Router } from 'express'

const roomTypeRouter = Router()

roomTypeRouter.get('/:id', getPropertyRoomType)
roomTypeRouter.get('/property/:slug/search', getPropertyRoomTypeByProperty)
roomTypeRouter.patch('/property/:slug', getPropertyRoomTypeByProperty)

export default roomTypeRouter