import bcrypt from 'bcrypt'

export const hashPassword = async(password:string) => {
    const saltrounds = 10
    return await bcrypt.hash(password, saltrounds)
}

export const comparePassword = async(passwordUser: string, passwordDb: string) => {
    return await bcrypt.compare(passwordUser, passwordDb)
}