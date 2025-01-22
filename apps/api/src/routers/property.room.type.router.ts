import { createPropertyRoomType, deletePropertyRoomType, getPropertyRoomType, getPropertyRoomTypeByProperty, getPropertyRoomTypeByTenant, getSinglePropertyRoomTypeByTenant, updatePropertyRoomTypeGeneral } from '@/controllers/property.room.type.controller'
import { tenantRoleValidation } from '@/middlewares/tenant.role.validation'
import { uploader } from '@/middlewares/uploader'
import { createPropertyRoomTypeValidator, deletePropertyValidator, updatePropertyRoomTypeGeneralValidator } from '@/middlewares/validator'
import { verifyToken } from '@/middlewares/verify.token'
import { Router } from 'express'

const roomTypeRouter = Router()

roomTypeRouter.get('/:roomTypeId', getPropertyRoomType)
roomTypeRouter.get('/tenant/:roomTypeId', verifyToken, tenantRoleValidation, getSinglePropertyRoomTypeByTenant)
roomTypeRouter.get('/property/:slug/search', getPropertyRoomTypeByProperty)
roomTypeRouter.get('/tenant/:slug/search', verifyToken, tenantRoleValidation, getPropertyRoomTypeByTenant)
roomTypeRouter.patch('/property/:slug', verifyToken, tenantRoleValidation, updatePropertyRoomTypeGeneralValidator, updatePropertyRoomTypeGeneral)
roomTypeRouter.patch('/delete/:slug', verifyToken, tenantRoleValidation, deletePropertyValidator,  deletePropertyRoomType)
roomTypeRouter.post('/property/:slug', verifyToken, tenantRoleValidation, uploader, createPropertyRoomTypeValidator, createPropertyRoomType)

export default roomTypeRouter