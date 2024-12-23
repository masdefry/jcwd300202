import { getPropertyRoomType } from '@/controllers/property.room.type.controller'
import { Router } from 'express'

const roomTypeRouter = Router()

roomTypeRouter.get('/:id', getPropertyRoomType)

export default roomTypeRouter