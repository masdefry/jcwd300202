import prisma from "@/prisma";
import { getGeneralRoomHasFacilitiesByPropertyService, getRoomHasFacilitiesService, updateRoomHasFacilitiesByPropertyService, updateRoomHasFacilitiesService } from "@/services/room.has.facility.service";
import { Request, Response, NextFunction } from "express";

export const getRoomHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body 
        const { propertyRoomTypeId } = req.params
        const { name = '' } = req.query

        const getRoomHasFacilitiesProcess = await getRoomHasFacilitiesService({ id, role, propertyRoomTypeId: Number(propertyRoomTypeId), name: name as string })
        
        res.status(200).json({
            error: false,
            message: 'Get room has facilites success',
            data: {
                roomHasFacilities: getRoomHasFacilitiesProcess?.roomHasFacilities,
                roomNotHasFacilities: getRoomHasFacilitiesProcess?.roomNotHasFacilities,
                propertyRoomFacilitiesId: getRoomHasFacilitiesProcess?.propertyRoomFacilitiesId,
                propertyRoomType: getRoomHasFacilitiesProcess?.propertyRoomType,
                property: getRoomHasFacilitiesProcess?.property,
            }
        })

    } catch (error) {
        next(error)
    }
}
export const getGeneralRoomHasFacilitiesByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body 
        const { slug } = req.params
        const { name = '' } = req.query

        const getGeneralRoomHasFacilitiesByPropertyProcess = await getGeneralRoomHasFacilitiesByPropertyService({ id, role, slug, name: name as string })

        
        res.status(200).json({
            error: false,
            message: 'Get room has facilites success',
            data: {
                roomHasFacilities: getGeneralRoomHasFacilitiesByPropertyProcess?.roomHasFacilities,
                roomNotHasFacilities: getGeneralRoomHasFacilitiesByPropertyProcess?.roomNotHasFacilities,
                propertyRoomFacilitiesId: getGeneralRoomHasFacilitiesByPropertyProcess?.propertyRoomFacilitiesId,
                property: getGeneralRoomHasFacilitiesByPropertyProcess?.property,
            }
        })

    } catch (error) {
        next(error)
    }
}

export const updateRoomHasFacilities = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomFacilitiesId, id, role } = req.body
        const { propertyRoomTypeId } = req.params

        const updateRoomHasFacilitiesProcess = await updateRoomHasFacilitiesService({ propertyRoomFacilitiesId, id, role, propertyRoomTypeId: Number(propertyRoomTypeId) })

        res.status(200).json({
            error: false,
            message: 'Update room facility success',
            data: updateRoomHasFacilitiesProcess?.dataCreateManyRoomHasFacilities
        })

    } catch (error) {
        next(error)
    }
}
export const updateRoomHasFacilitiesByProperty = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyRoomFacilitiesId, id, role } = req.body
        const { slug } = req.params

        const updateRoomHasFacilitiesByPropertyProcess = await updateRoomHasFacilitiesByPropertyService({ propertyRoomFacilitiesId, id, role, slug })

        res.status(200).json({
            error: false,
            message: 'Update room facility success',
            data: updateRoomHasFacilitiesByPropertyProcess?.dataCreateManyRoomHasFacilities
        })

    } catch (error) {
        next(error)
    }
}