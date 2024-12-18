import prisma from "@/prisma";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import { createToken, createTokenExpiresIn1H } from "@/utils/jwt";
import { transporter } from "@/utils/transporter";
import { NextFunction, Request, Response } from "express";
import fs from 'fs'
import { compile } from "handlebars";
import { text } from "stream/consumers";

export const loginTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const isEmailExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })

        if( !isEmailExist!.id ) throw { msg: 'Tenant not found!', status: 406 }
        if( !isEmailExist!.password ) throw { msg: 'Please make request for verify email!', status: 406 }

        const isPasswordValid = await comparePassword( password, isEmailExist!.password )
        if(!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

        const token = await createToken({ id: isEmailExist!.id, role: isEmailExist!.role })

        res.status(200).json({
            errror: false,
            message: 'Login success',
            data: {
                username: isEmailExist?.pic,
                country: '',
                profilePictureUrl: '',
                role: isEmailExist?.role,
                isVerified: isEmailExist?.isVerified,
                token
            }
        })

    } catch (error) {
        next(error)
    }
}

export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email,
                isGoogleRegistered: false
            },
            include: {
                country: true
            }
        })

        if( !isEmailExist?.id ) throw { msg: 'User not found!', status: 406 }
        if( !isEmailExist?.password ) throw { msg: 'Please make request for verify email!', status: 406 }

        const isPasswordValid = await comparePassword( password, isEmailExist!.password )
        if(!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

        const token = await createToken({ id: isEmailExist!.id, role: isEmailExist!.role })

        res.status(200).json({
            errror: false,
            message: 'Login success',
            data: {
                username: isEmailExist?.username,
                country: isEmailExist?.country?.name,
                profilePictureUrl: `${isEmailExist?.directory}/${isEmailExist?.filename}`,
                role: isEmailExist?.role,
                isVerified: isEmailExist?.isVerified,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body

        const isUserExist = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(isUserExist) throw { msg: 'User already exist!', status: 406 }
        let tokenForVerifyEmail, username, profilePictureUrl, token, createdUser
        
        await prisma.$transaction(async(tx) => {
            createdUser = await tx.user.create({
                data: {
                    email
                }
            })
    
            username = createdUser?.username
    
            token = await createToken({id: createdUser.id, role: createdUser.role})
    
            tokenForVerifyEmail = await createTokenExpiresIn1H({id: createdUser.id, role: createdUser.role})
            
            await tx.user.update({
                where: {
                    id: createdUser.id
                },
                data: {
                    token: tokenForVerifyEmail
                }
            })

        })
        
        const verifyEmailLink = `http://localhost:3000/auth/verify/${tokenForVerifyEmail}`
        
        const emailBody = fs.readFileSync('./src/public/body.email/verify.email.html', 'utf-8')
        let compiledEmailBody: any = await compile(emailBody)
        compiledEmailBody = compiledEmailBody({url: verifyEmailLink})

        await transporter.sendMail({
            to: email,
            subject: 'Verify Email [Roomify]',
            html: compiledEmailBody
        })

        res.status(201).json({
            error: false,
            message: 'Register user success',
            data: {
                email
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        let compiledEmailBody, createdTenant, token;
        const isEmailExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })

        if(isEmailExist?.id) throw { msg: 'Tenant already exist!', status: 406 }

        
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })

        if(isTenantExist) throw { msg: 'Tenant already exist!', status: 406 }

        await prisma.$transaction(async(tx) => {
            createdTenant = await tx.tenant.create({
                data: {
                    email
                }
            })
    
            token = await createToken({id: createdTenant.id, role: createdTenant.role})
            const tokenForVerifyEmail = await createTokenExpiresIn1H({id: createdTenant.id, role: createdTenant.role})
    
            const verifyEmailLink = `http://localhost:3000/tenant/auth/verify/${tokenForVerifyEmail}`
            
            const emailBody = fs.readFileSync('./src/public/body.email/verify.email.tenant.html', 'utf-8')
            compiledEmailBody = await compile(emailBody)
            compiledEmailBody = compiledEmailBody({url: verifyEmailLink})
    
            await tx.tenant.update({
                where: {
                    id: createdTenant.id
                },
                data: {
                    token: tokenForVerifyEmail
                }
            })
        }, {
            timeout: 25000
        })


        await transporter.sendMail({
            to: email,
            subject: 'Verify Email [Roomify]',
            html: compiledEmailBody
        })

        res.status(201).json({
            error: false,
            message: 'Register user success',
            data: {
                email
            }
        })
    } catch (error) {
        next(error)
    }
}

export const verifyEmailRequestUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        
        const isUserExist = await prisma.user.findUnique({
            where: {
                email
            }
        })
        
        if( !isUserExist?.id ) throw { msg: 'User not found!', status: 406 }
        if( isUserExist?.isVerified ) throw { msg: 'Email already verified!', status: 406 }

        const tokenForVerifyEmail = await createTokenExpiresIn1H({id: isUserExist.id, role: isUserExist.role})
        
        await prisma.$transaction(async(tx) => {
            await tx.user.update({
                where: {
                    id: isUserExist.id
                }, 
                data: {
                    token: tokenForVerifyEmail
                }
            })
                
            const verifyEmailLink = `http://localhost:3000/auth/verify/${tokenForVerifyEmail}`
            
            const emailBody = fs.readFileSync('./src/public/body.email/verify.email.tenant.html', 'utf-8')
            let compiledEmailBody: any = await compile(emailBody)
            compiledEmailBody = compiledEmailBody({url: verifyEmailLink})
    
            await transporter.sendMail({
                to: email,
                subject: 'Request Verify Email [Roomify]',
                html: compiledEmailBody  
            })
        }, {
            timeout: 25000
        })

        res.status(200).json({
            error: false,
            message: 'Send link verify email success',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}

export const verifyEmailRequestTenant = async(req: Request, res: Response, next: NextFunction) => {
    try{
    const { email } = req.body
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })
        
        if( !isTenantExist?.id ) throw { msg: 'Tenant not found!', status: 406 }
        if( isTenantExist?.isVerified ) throw { msg: 'Email already verified!', status: 406 }

        const tokenForVerifyEmail = await createTokenExpiresIn1H({id: isTenantExist.id, role: isTenantExist.role})
        
        await prisma.$transaction(async(tx) => {
            await tx.tenant.update({
                where: {
                    id: isTenantExist.id
                }, 
                data: {
                    token: tokenForVerifyEmail
                }
            })
                
            const verifyEmailLink = `http://localhost:3000/tenant/auth/verify/${tokenForVerifyEmail}`
            
            const emailBody = fs.readFileSync('./src/public/body.email/verify.email.html', 'utf-8')
            let compiledEmailBody: any = await compile(emailBody)
            compiledEmailBody = compiledEmailBody({url: verifyEmailLink})
    
            await transporter.sendMail({
                to: email,
                subject: 'Request Verify Email [Roomify]',
                html: compiledEmailBody  
            })
        }, {
            timeout: 25000
        })

        res.status(200).json({
            error: false,
            message: 'Send link verify email success',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}

export const verifyEmailUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, token, password } = req.body
        const isUserExist = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!isUserExist?.id) throw { msg: 'User not found!', status: 406 }
        if(isUserExist?.token !== token) throw { msg: 'Session expired!', status: 406 }

        await prisma.user.update({
            where: {
                id,
                token
            },
            data: {
                password: await hashPassword(password),
                isVerified: true,
                token: ''
            }
        })

        res.status(200).json({
            error: false,
            message: 'Verify email and set password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const verifyEmailTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, token, password } = req.body
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })

        if(!isTenantExist?.id) throw { msg: 'Tenant not found!', status: 406 }
        
        const isTokenValid = await prisma.tenant.findUnique({
            where: {
                id,
                token
            }
        })

        if(!isTokenValid?.id) throw { msg: 'Session expired!', status: 406 }

        await prisma.tenant.update({
            where: {
                id,
                token
            },
            data: {
                password: await hashPassword(password),
                isVerified: true,
                token: ''
            }
        })

        res.status(200).json({
            error: false,
            message: 'Verify email and set password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const signInWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body

        const checkUser = await prisma.user.findUnique({
            where : {
                email
            },
            include: {
                country: true
            }
        })
        let userData;
    
        if(!checkUser?.id) {
                
            const newUser = await prisma.user.create({
                data: { 
                    email, 
                    isGoogleRegistered: true,
                    isVerified: true
                },
                include: {
                    country: true
                }
            })
    
            userData = {
                username: newUser?.username,
                role: newUser?.role,
                id: checkUser?.id,
                country: newUser?.country?.name,
                isVerified: newUser?.isVerified,
                isGoogleRegistered: newUser?.isGoogleRegistered,
                profilePictureUrl: newUser?.directory ? `http://localhost:5000/${newUser.directory}/${newUser.filename}/${newUser.fileExtension}` : ''
            }
        
        } else {
            userData = {
                username: checkUser?.username,
                role: checkUser?.role,
                isVerified: checkUser?.isVerified,
                country: checkUser?.country?.name,
                id: checkUser?.id,
                isGoogleRegistered: checkUser?.isGoogleRegistered,
                profilePictureUrl: checkUser?.directory ? `http://localhost:5000/${checkUser?.directory}/${checkUser?.filename}/${checkUser?.fileExtension}` : ''
            }
        }
    
        const token = await createToken({id: userData?.id as string, role: userData?.role as string})

        res.status(200).json({
            error: false,
            message: 'Authentication with Google success',
            data: {
                token,
                username: userData?.username,
                role: userData?.role,
                isVerified: userData?.isVerified,
                isGoogleRegistered: userData?.isGoogleRegistered,
                profilePictureUrl: userData?.profilePictureUrl,
                country: userData?.country
            }
        })

    } catch (error) {
        next(error)
    }
}

export const sendEmailResetPasswordUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const isUserExist = await prisma.user.findUnique({
            where: {
                email,
                isGoogleRegistered: false
            }
        })

        if(!isUserExist?.id) throw { msg: 'User not found!', status: 406 }
        if(!isUserExist?.isVerified) throw { msg: 'Please make request for verify email!', status: 406 }

        const token = await createTokenExpiresIn1H({ id: isUserExist!.id, role: isUserExist!.role })

        await prisma.$transaction(async(tx) => {
            await tx.user.update({
                where: {
                    email
                },
                data: {
                    token
                }
            })
    
            const link = `http://localhost:3000/auth/reset-password/${token}`
    
            const emailBody = fs.readFileSync('./src/public/body.email/reset.password.html', 'utf-8')
            let compiledEmailBody: any = await compile(emailBody)
            compiledEmailBody = compiledEmailBody({ url: link })
    
            await transporter.sendMail({
                to: email,
                subject: 'Reset Password [Roomify]',
                html: compiledEmailBody
            })
        }, {
            timeout: 25000
        })

        res.status(200).json({
            error: false,
            message: 'Send email reset password success',
            data: {
                email
            }
        })

    } catch (error) {
        next(error)
    }
}

export const resetPasswordUser = async(req: Request, res: Response, next: NextFunction) => {
    try {   
        const { password, token, id } = req.body
        const isUserExist = await prisma.user.findUnique({
            where: {
                id,
                isGoogleRegistered: false
            }
        })
        
        if(!isUserExist?.id) throw { msg: 'User not found!', status: 406 }
        if(isUserExist?.token !== token) throw { msg: 'Session expired!', status: 406 }
        
        const comparedPassword = await comparePassword(password, isUserExist?.password as string)

        if(comparedPassword) throw { msg: 'Password already used!', status: 406 }
        
        await prisma.user.updateMany({
            where: {
                id
            },
            data: {
                password: await hashPassword(password),
                token: ''
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const resetPasswordTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {   
        const { password, token, id } = req.body
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                id
            }
        })
        
        if(!isTenantExist?.id) throw { msg: 'Tenant not found!', status: 406 }
        if(isTenantExist?.token !== token) throw { msg: 'Session expired!', status: 406 }
        
        const comparedPassword = await comparePassword(password, isTenantExist?.password as string)

        if(comparedPassword) throw { msg: 'Password already used!', status: 406 }
        
        await prisma.tenant.updateMany({
            where: {
                id
            },
            data: {
                password: await hashPassword(password),
                token: ''
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, token } = req.body

        let isAccountExist, username, profilePictureUrl, isVerified, country;
        
        if(role === 'USER') {
            isAccountExist = await prisma.user.findUnique({
                where: {
                    id
                },
                include: {
                    country: true
                }
            })

            if(!isAccountExist?.id) throw { msg: 'User not found!', status: 406 }
            
            username = isAccountExist?.username
            country = isAccountExist?.country?.name
            isVerified = isAccountExist?.isVerified
            profilePictureUrl = isAccountExist?.directory ? `http://localhost:5000/${isAccountExist?.directory}/${isAccountExist?.filename}/${isAccountExist?.fileExtension}` : ''             
        } else if(role === 'TENANT') {
            isAccountExist = await prisma.tenant.findUnique({
                where: {
                    id
                }
            })

            if(!isAccountExist?.id) throw { msg: 'User not found!', status: 406 }
            
            username = isAccountExist?.pic
            isVerified = isAccountExist?.isVerified
            country = ''
            profilePictureUrl = isAccountExist?.directory ? `http://localhost:5000/${isAccountExist?.directory}/${isAccountExist?.filename}/${isAccountExist?.fileExtension}` : ''             
        } else {
            throw {msg: 'Role unauthorized!', status: 406}
        }

        res.status(200).json({
            error: false,
            message: 'Keep auth success',
            data: {
                username,
                isVerified,
                role,
                profilePictureUrl,
                country,
                token
            }
        })

    } catch (error) {
        next(error)
    }
}