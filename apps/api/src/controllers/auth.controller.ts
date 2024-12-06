import prisma from "@/prisma";
import { comparePassword } from "@/utils/hashPassword";
import { createToken } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

export const authUser = async(res: Response, req: Request, next: NextFunction) => {
    try {
        const { email, password } = req.body
        let token, isVerified,

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if( isEmailExist ) {
            const isPasswordValid = await comparePassword( password, isEmailExist.password )
            if(!isPasswordValid) throw { msg: 'Password invalid!', status: 406 }

            token = await createToken({ id: isEmailExist.id, role: isEmailExist.role })
        
        }

    } catch (error) {
        next(error)
    }
}