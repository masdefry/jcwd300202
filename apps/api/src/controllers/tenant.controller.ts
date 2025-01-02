import prisma from "@/prisma";
import { createTokenExpiresIn1H } from "@/utils/jwt";
import { transporter } from "@/utils/transporter";
import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import fs from 'fs'
import { compile } from "handlebars";

export const getTenantProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

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
                companyName: isTenantExist?.companyName,
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
            id, 
            role,
            email,
            pic,
            phoneNumber,
            companyName,
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
                address,
                companyName
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
                companyName: updatedTenantProfile?.companyName,
            }
        })


    } catch (error) {
        next(error)
    }
}

export const updateTenantProfilePicture = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
             id, 
             role
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

export const updateTenantEmail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, email } = req.body

        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id,
            }
        })

        if(!isTenantExist?.id || isTenantExist?.deletedAt) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }
        if(isTenantExist?.email === email) throw { msg: 'The new email cannot be the same as your current email!', status: 406 }

        const token = await createTokenExpiresIn1H({ id: isTenantExist?.id, role: isTenantExist?.role })

        await prisma.$transaction(async(tx) => {
            try {
                const updatedEmail = await tx.tenant.update({
                    where: {
                        id
                    },
                    data: {
                        email,
                        isVerified: false,
                        token
                    }
                })
        
                if(!updatedEmail?.email) throw { msg: 'Update tenant email failed!', status: 500 }
        
                const link = `http://localhost:3000/tenant/auth/verify/email/${token}`
            
                const emailBody = fs.readFileSync('./src/public/body.email/verify.change.email.tenant.html', 'utf-8')
                let compiledEmailBody: any = await compile(emailBody)
                compiledEmailBody = compiledEmailBody({ url: link })

                await transporter.sendMail({
                    to: email,
                    subject: 'Verify New Email [Roomify]',
                    html: compiledEmailBody
                })
            } catch (err) {
                throw { msg: 'Send email for verification failed!', status: 500 }
            }
        }, {
            timeout: 50000
        })


        res.status(200).json({
            error: false,
            message: 'Update tenant email success',
            data: {
                email
            }
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTenantProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
             id, role
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