import { Response, Request, NextFunction } from 'express'
import { createPropertyTypeService, deletePropertyTypeService, updatePropertyTypeService, getPropertyTypesByTenantService, getPropertyTypesService } from '@/services/property.type.service'

export const getPropertyTypes = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query

        const getPropertyTypesProcess = await getPropertyTypesService({name: name as string})

        res.status(200).json({
            error: false,
            message: 'Get property types success',
            data: getPropertyTypesProcess?.propertyType
        })
    } catch (error) {
        next(error)
    }
}

export const getPropertyTypesByTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body
      const { limit, offset, name, order } = req.query

      const getPropertyTypesByTenantProcess = await getPropertyTypesByTenantService({id, role, limit: limit as string, offset: offset as string, name: name as string, order: order as string,})
  
        res.status(200).json({
          error: false,
          message: 'Get property types by tenant success',
          data: {
            propertyTypes: getPropertyTypesByTenantProcess?.propertyTypesByTenant,
            pageInUse: getPropertyTypesByTenantProcess?.pageInUse,
            totalPage: getPropertyTypesByTenantProcess?.totalPage,
            offset: Number(offset)
        }
        })
    } catch (error) {
      next(error)
    }
  }

export const createPropertyType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, name, description } = req.body

        const createPropertyTypeProcess = await createPropertyTypeService({ id, role, name, description }) 

        res.status(201).json({
            error: false,
            message: 'Create property type success',
            data: createPropertyTypeProcess?.createdPropertyType
        })

    } catch (error) {
        next(error)
    }
}

export const updatePropertyType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, name, description, propertyTypeId } = req.body

        const updatePropertyTypeProcess = await updatePropertyTypeService({ id, role, name, description, propertyTypeId })

        res.status(200).json({
            error: false,
            message: 'Update property type success',
            data: updatePropertyTypeProcess?.updatedPropertyType
        })

    } catch (error) {
        next(error)
    }
}
export const deletePropertyType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, propertyTypeId, password } = req.body

        await deletePropertyTypeService({ id, role, propertyTypeId, password })

        res.status(201).json({
            error: false,
            message: 'Delete property type success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}