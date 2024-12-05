import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface ICreateToken {
    id: string,
    role: string
}

const privateKeyJsonWebToken = process.env.JWT_PASSWORD as string

export const createToken = async({ id, role }: ICreateToken) => {
    return await jwt.sign({data: {id, role}}, privateKeyJsonWebToken, { expiresIn: '1d' })
}

export const verifyToken = async( token: string) => {
    return await jwt.verify(token, privateKeyJsonWebToken)
}

export const createTokenExpiresIn1H = async({ id, role }: ICreateToken) => {
    return await jwt.sign({data: {id, role}}, privateKeyJsonWebToken, {expiresIn: '1h'})
}