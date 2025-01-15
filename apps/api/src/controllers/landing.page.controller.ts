import prisma from "@/prisma";
import { getLandingPageDataService } from "@/services/landing.page.service";
import { NextFunction, Request, Response } from "express";

export const getLandingPageData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
        
        const getLandingPageDataProcess = await getLandingPageDataService({ id, role })

        res.status(200).json({
            error: false,
            message: 'Get landing page data success',
            data: {
                cities: getLandingPageDataProcess?.cities,
                properties: getLandingPageDataProcess?.properties,
                propertyTypes: getLandingPageDataProcess?.propertyTypes,
                transactions: getLandingPageDataProcess?.transactions,
            }
        })

    } catch (error) {
        next(error)
    }
}