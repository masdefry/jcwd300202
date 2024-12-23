import prisma from "@/prisma";
import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";

export const getTenantProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id = 'cm4kqq7tq000014dvqvii4irj', role = 'TENANT'} = req.body

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

        res.status(200).json({
            error: false,
            message: 'Get Tenant profile success',
            data: {
                pic: isTenantExist?.pic,
                phoneNumber: isTenantExist?.phoneNumber,
                isVerified: isTenantExist?.isVerified,
                email: isTenantExist?.email,
                address: isTenantExist?.address,
                profilePictureUrl: isTenantExist?.directory ? `http://localhost:5000/api/${isTenantExist?.directory}/${isTenantExist?.filename}.${isTenantExist.fileExtension}` : ''
            }
        })

    } catch (error) {
        next(error)
    }
}

export const updateTenantProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id = 'cm4kqq7tq000014dvqvii4irj', role = 'TENANT',
            email,
            pic,
            phoneNumber,
            address 
        } = req.body

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

        const updatedTenantProfile = await prisma.tenant.update({
            where: {
                id
            },
            data: {
                pic,
                phoneNumber,
                address
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update Tenant profile success',
            data: {
                email: updatedTenantProfile?.email,
                pic: updatedTenantProfile?.pic,
                phoneNumber: updatedTenantProfile?.phoneNumber,
                address: updatedTenantProfile?.address,
            }
        })


    } catch (error) {
        next(error)
    }
}

export const updateTenantProfilePicture = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
             id = 'cm4kqq7tq000014dvqvii4irj', role = 'TENANT'
        } = req.body

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }
        
        const imagesUploaded: any = req.files

        const directory = imagesUploaded?.images[0].destination
        let filename = imagesUploaded?.images[0].filename.split('.')[0]
        let fileExtension = imagesUploaded?.images[0].filename.split('.')
        fileExtension = fileExtension[fileExtension.length - 1]

        const updatedTenantProfilePicture = await prisma.tenant.update({
            where: {
                id
            },
            data: {
                filename,
                directory,
                fileExtension
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update Tenant profile picture success',
            data: {
                profilePictureUrl: `http://localhost:5000/api/${updatedTenantProfilePicture?.directory}/${updatedTenantProfilePicture?.filename}.${updatedTenantProfilePicture.fileExtension}`
            }
        })

    } catch (error) {
        next(error)
    }
}

export const deleteTenantProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
             id = 'cm4kqq7tq000014dvqvii4irj', role = 'TENANT'
        } = req.body

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

        await prisma.tenant.update({
            where: {
                id
            }, 
            data: {
                deletedAt: new Date().toISOString()
            }
        })

        res.status(200).json({
            error: false,
            message: 'Delete account success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}