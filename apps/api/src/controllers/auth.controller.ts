import prisma from "@/prisma";
import { comparePassword } from "@/utils/hashPassword";
import { createToken, createTokenExpiresIn1H } from "@/utils/jwt";
import { transporter } from "@/utils/transporter";
import { NextFunction, Request, Response } from "express";

export const loginTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const isEmailExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })

        if( !isEmailExist ) throw { msg: 'Tenant not found!', status: 406 }
        if( !isEmailExist.password ) throw { msg: 'Please verify email first!', status: 406 }

        const isPasswordValid = await comparePassword( password, isEmailExist.password )
        if(!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

        const token = await createToken({ id: isEmailExist.id, role: isEmailExist.role })

        res.status(200).json({
            errror: false,
            message: 'Login success',
            data: {
                username: '',
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
                email
            }
        })

        if( !isEmailExist ) throw { msg: 'User not found!', status: 406 }
        if( !isEmailExist.password ) throw { msg: 'Please verify email first!', status: 406 }

        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: isEmailExist.id
            }
        })

        const isPasswordValid = await comparePassword( password, isEmailExist.password )
        if(!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

        const token = await createToken({ id: isEmailExist.id, role: isEmailExist.role })

        res.status(200).json({
            errror: false,
            message: 'Login success',
            data: {
                username: userProfile?.username,
                profilePictureUrl: userProfile?.profilePictureUrl,
                role: isEmailExist?.role,
                isVerified: isEmailExist?.isVerified,
                token
            }
        })
    } catch (error) {
        
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
        
        const createdUser = await prisma.user.create({
            data: {
                email
            }
        })

        const createdProfile = await prisma.profile.create({
            data: {
                userId: createdUser.id
            }
        })

        const username = createdProfile?.username
        const profilePictureUrl = createdProfile?.profilePictureUrl

        const token = await createToken({id: createdUser.id, role: createdUser.role})

        const tokenForVerifyEmail = await createTokenExpiresIn1H({id: createdUser.id, role: createdUser.role})
        
        await prisma.user.update({
            where: {
                id: createdUser.id
            },
            data: {
                token: tokenForVerifyEmail
            }
        })
        
        const verifyEmailLink = `https://localhost:3000/auth/verify/${tokenForVerifyEmail}`

        //VERIFY LINK DIPAKAI BUAT HTMLNYA NANTI

        await transporter.sendMail({
            to: email,
            subject: 'Verify Email [Roomify]',
            html: '<h1>Verify Please</h1>'
        })

        res.status(201).json({
            error: false,
            message: 'Register user success',
            data: {
                username,
                profilePictureUrl,
                isVerified: createdUser.isVerified,
                token,
                role: createdUser.role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerTenant = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        
        const isTenantExist = await prisma.tenant.findUnique({
            where: {
                email
            }
        })

        if(isTenantExist) throw { msg: 'Tenant already exist!', status: 406 }

        const createdTenant = await prisma.tenant.create({
            data: {
                email
            }
        })

        const token = await createToken({id: createdTenant.id, role: createdTenant.role})
        const tokenForVerifyEmail = await createTokenExpiresIn1H({id: createdTenant.id, role: createdTenant.role})

        await prisma.tenant.update({
            where: {
                id: createdTenant.id
            },
            data: {
                token: tokenForVerifyEmail
            }
        })

        await transporter.sendMail({
            to: email,
            subject: 'Verify Email [Roomify]',
            html: '<h1>Verify Please</h1>'
        })

        res.status(201).json({
            error: false,
            message: 'Register user success',
            data: {
                username: '',
                profilePictureUrl: '',
                isVerified: createdTenant.isVerified,
                token,
                role: createdTenant.role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const verifyEmailRequest = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
        let account

        if( role === 'USER' ) {
            account = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if( !account?.id ) throw { msg: 'User not found!', status: 406 }
            if( account?.isVerified ) throw { msg: 'Email already verified!', status: 406 }

            const tokenForVerifyEmail = await createTokenExpiresIn1H({id: account.id, role: account.role})
                
            await prisma.user.update({
                where: {
                    id: account.id
                },
                data: {
                    token: tokenForVerifyEmail
                }
            })
                
            const verifyEmailLink = `https://localhost:3000/auth/verify/${tokenForVerifyEmail}`

            //VERIFY LINK DIPAKAI BUAT HTMLNYA NANTI

            await transporter.sendMail({
                to: account?.email,
                subject: 'Verify Email [Roomify]',
                html: '<h1>Please verify !</h1>'  
            })

        } else if( role === 'TENANT') {
            account = await prisma.tenant.findUnique({
                where: {
                    id
                }
            })

            if( !account?.id ) throw { msg: 'Tenant not found!', status: 406 }
            if( account?.isVerified ) throw { msg: 'Email already verified!', status: 406 }

            const tokenForVerifyEmail = await createTokenExpiresIn1H({id: account.id, role: account.role})
                
            await prisma.tenant.update({
                where: {
                    id: account.id
                },
                data: {
                    token: tokenForVerifyEmail
                }
            })
                
            const verifyEmailLink = `https://localhost:3000/auth/verify/${tokenForVerifyEmail}`

            //VERIFY LINK DIPAKAI BUAT HTMLNYA NANTI

            await transporter.sendMail({
                to: account?.email,
                subject: 'Verify Email [Roomify]',
                html: '<h1>Please verify !</h1>'  
            })
        } else {
            throw { msg: 'Role Invalid!', status: 406 }
        }
        
        res.status(200).json({
            error: false,
            message: 'Send link verify email success',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}

export const verifyEmail = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, token, password } = req.body
    
        let account, profile;
        if(role === 'TENANT') {
            account = await prisma.tenant.update({
                where: {
                    id,
                    token
                }, 
                data: {
                    password
                }
            })
            
            if(!account) throw { msg: 'Id or token invalid!', status: 406 }

            profile = await prisma.profile.findUnique({
                where: {
                    userId: account.id
                }
            })

        } else if( role === "USER") {
            account = await prisma.user.update({
                where: {
                    id,
                    token
                },
                data: {
                    password,
                    isVerified: true
                }
            })
        } else {
            throw { msg: 'Role invalid!', status: 406 }
        }
    
        if(!account) throw { msg: 'Id or token invalid!', status: 406 }

        const createdToken = await createToken({ id: account.id, role: account.role })

        res.status(200).json({
            error: false,
            message: 'Verify email and set password success',
            data: {
                token: createdToken,
                role: account.role,
                username: profile?.username,
                profilePictureUrl: profile?.profilePictureUrl,
                isVerified: account.isVerified
            }
        })
    } catch (error) {
        next(error)
    }


}