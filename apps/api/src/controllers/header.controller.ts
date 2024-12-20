import { Request, Response, NextFunction } from 'express'
import { createSearchService } from '@/services/header.service'
import { ISearch } from '@/services/header.service/types'
import prisma from '@/prisma'

export const fetchData = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { country, city, checkInDate, checkOutDate, adult, children, limit = 10, offset = 0 } = req.query

        let getAllProperty ;
        if(country && city && checkInDate && checkOutDate && adult && children) {
            getAllProperty = await prisma.property.findMany({
                take: Number(limit),
                skip: Number(offset),
                include: {
                    propertyHasFacility: {
                        include: {
                            propertyFacility: true
                        }
                    }
                }
            })
        }

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
            country: Number(country), 
            city: Number(city), 
            checkInDate: isoCheckIn, 
            checkOutDate: isoCheckOut, 
            adult: Number(adult), 
            children: Number(children)
        })

        
        res.status(200).json({
            message: 'Successfully fetch properties',
            error: false,
            data: search || getAllProperty
        })
        
    } catch (error) {
       // console.log(error)
        next(error)
    }
}

export const getCityAndCountryList = async(req: Request, res: Response, next:NextFunction) => {
    try {
        const { search } = req.query
        interface IDropdown {
            cityName: string,
            cityId: number | string,
            countryName: string,
            countryId: number | string
        }

        const dropdown: IDropdown[] = []

        const citiesWithCountry = await prisma.city.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: 'insensitive'
                }
            },
            include: {
                country: true
            }
        })
        
        citiesWithCountry.forEach(item => {
            const cityWithCountry = {
                cityName: item.name,
                cityId: item.id,
                countryName: item.country.name,
                countryId: item.countryId
            }
            dropdown.push({...cityWithCountry})
        })

        const countries = await prisma.country.findMany({
            where: {
                name: {
                    contains: search as string,
                    mode: 'insensitive'
                }
            }
        })
        
        countries.forEach(item => {
            const country = {
                cityName: '',
                cityId: '',
                countryName: item.name,
                countryId: item.id
            }
            dropdown.push({...country})
        })

        res.status(200).json({
            error: false,
            message: 'Get city and country list success',
            data: {
                dropdown
            }
        })

    } catch (error) {
        next(error)
    }
}