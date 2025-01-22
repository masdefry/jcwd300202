import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface ICreateToken {
    id: string,
    role: string
}


export const createToken = async({ id, role }: ICreateToken) => {
    return jwt.sign({data: {id, role}}, 'jwt123token#', { expiresIn: '1d' })
}


export const decodeToken = async(token: string) => {
    return jwt.verify(token, 'jwt123token#')
}


export const createTokenExpiresIn1H = async({ id, role }: ICreateToken) => {
    return jwt.sign({data: {id, role}}, 'jwt123token#', {expiresIn: '1h'})
}