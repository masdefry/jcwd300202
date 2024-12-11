import { Request, Response, NextFunction } from 'express'
import { createSearchService } from '@/services/header.service'
import { ISearch } from '@/services/header.service/types'
// import prisma from

export const fetchData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { propertyTypeId, country, city, checkInDate, checkOutDate, adult, children } = req.query

        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({
                message: 'Check-in and check-out dates are required',
                error: true,
                data: {}
            });
        }

        const parsedCheckInDate = new Date(checkInDate as string);
        const parsedCheckOutDate = new Date(checkOutDate as string);

        // Validate if dates are valid
        if (isNaN(parsedCheckInDate.getTime()) || isNaN(parsedCheckOutDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format',
                error: true,
                data: {}
            });
        }

        // Convert to ISO string and then back to Date
        const isoCheckIn = new Date(parsedCheckInDate.toISOString());
        const isoCheckOut = new Date(parsedCheckOutDate.toISOString());

        const search = await createSearchService({
            propertyTypeId: Number(propertyTypeId),
            country: Number(country), 
            city: Number(city), 
            checkInDate: isoCheckIn, 
            checkOutDate: isoCheckOut, 
            adult: Number(adult), 
            children: Number(children)
        })

        console.log(search)
        
        res.status(200).json({
            message: 'Successfully fetch properties',
            error: false,
            data: search
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: 'Failed to fetch properties',
            error: false,
            data: {}
        })
    }
}

// export const cityAndCountryList = async(req: Request, res: Response, next:NextFunction) => {
//     try {
//         const { search } = req.query
//         const cities = await prisma.

//     } catch (error) {
        
//     }
// }