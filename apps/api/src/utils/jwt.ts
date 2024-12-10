import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface ICreateToken {
    id: string,
    role: string
}

// const privateKeyJsonWebToken = process.env.JWT_PASSWORD as string

export const createToken = async({ id, role }: ICreateToken) => {
    return jwt.sign({data: {id, role}}, 'jwt123token#', { expiresIn: '1d' })
}

// console.log(createToken)

export const decodeToken = async(token: string) => {
    return jwt.verify(token, 'jwt123token#')
}

// console.log("Decoded token", decodeToken())

export const createTokenExpiresIn1H = async({ id, role }: ICreateToken) => {
    return jwt.sign({data: {id, role}}, 'jwt123token#', {expiresIn: '1h'})
}