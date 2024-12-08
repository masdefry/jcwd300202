import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

interface IUploadMulterProps {
    storageType:string
}

    const storage = multer.diskStorage({
        destination: function (req: Request, file: Express.Multer.File, cb:  (error: Error | null, destination: string) => void){
            cb(null, 'src/public/images')
        },
        filename: function (req: Request, file: Express.Multer.File, cb:  (error: Error | null, filename: string) => void){
            const splitOriginalName = file.originalname.split('.')
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + splitOriginalName[splitOriginalName.length-1])
        }
    })

    const fileFilter = (req: Request, file:Express.Multer.File, cb: FileFilterCallback) => {
        const extensionAccepted = ['png', 'jpg', 'jpeg', 'webp', 'svg']

        const splitOriginalName = file.originalname.split('.')
        if(!extensionAccepted.includes(splitOriginalName[splitOriginalName.length-1])){
            return cb(new Error('File Format Not Acceptable'))
        }

        return cb(null, true)
    }

    export const uploadMulter = multer({storage, fileFilter, limits: { fieldSize: 2000000 }})
