import { Response, Request, NextFunction } from 'express'
import { createPropertyTypeService, deletePropertyTypeService, getPropertyTypesService } from '@/services/property.type.service'

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

export const deletePropertyType = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, propertyTypeId } = req.body

        const deletePropertyTypeProcess = await deletePropertyTypeService({ id, role, propertyTypeId })

        res.status(201).json({
            error: false,
            message: 'Delete property type success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}