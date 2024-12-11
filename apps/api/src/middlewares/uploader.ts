import { uploadMulter } from "@/utils/multer";
import { NextFunction, Request, Response } from "express";
import fs from 'fs'

export const uploader = async(req: Request, res: Response, next: NextFunction) => {
    const uploaded = uploadMulter.fields([{name: 'images', maxCount: 7}])
    const { id, role } = req.body
    
    uploaded(req, res, (err) => {
        try {
            if(err) throw { msg: err.message}

            if(id && role) {
                req.body.id = id
                req.body.role = role
            }

            next()
        } catch (error) {
            const uplodedImages: any = req.files
            if(!Array.isArray(req?.files) && !req?.files?.images?.length) {
                uplodedImages?.images.forEach((item: any) => {
                    return fs.rmSync(`${item.destination}/${item.filename}`)
                })   
            }
            next(error)
        }
    })
}
