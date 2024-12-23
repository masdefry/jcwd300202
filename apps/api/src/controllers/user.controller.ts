import prisma from "@/prisma";
import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";

export const getUserProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id = 'cm4tm1tsd00012dj3vrih9dzy', role = 'USER' } = req.body

        const isUserExist = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                city: true,
                country: true
            }
        })

        if(isUserExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

        res.status(200).json({
            error: false,
            message: 'Get user profile success',
            data: {
                username: isUserExist?.username,
                phoneNumber: isUserExist?.phoneNumber,
                isVerified: isUserExist?.isVerified,
                email: isUserExist?.email,
                address: isUserExist?.address,
                birthDate: isUserExist?.birthDate,
                year: isUserExist?.birthDate?.getFullYear(),
                month: isUserExist?.birthDate?.getMonth() && isUserExist?.birthDate?.getMonth() + 1,
                date: isUserExist?.birthDate?.getDate(),
                gender: isUserExist?.gender,
                cityId: isUserExist?.cityId,
                countryId: isUserExist?.countryId,
                cityName: isUserExist?.city?.name,
                countryName: isUserExist?.country?.name,
                profilePictureUrl: isUserExist?.directory && `http://localhost:5000/api/${isUserExist?.directory}/${isUserExist?.filename}.${isUserExist.fileExtension}`
            }
        })

    } catch (error) {
        next(error)
    }
}

export const updateUserProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id = 'cm4tm1tsd00012dj3vrih9dzy', 
            role = 'USER',
            email,
            username,
            gender,
            phoneNumber,
            cityId,
            cityName,
            countryId,
            countryName,
            date,
            month,
            year,
            address 
        } = req.body

        let capitalizedCityName, capitalizedCountryName, isCountryExist, isCityExist, createdCountry, createdCity

        if(capitalizedCountryName) {
            capitalizedCountryName = countryName.slice(0,1).toUpperCase()
            capitalizedCountryName = capitalizedCountryName + countryName.slice(1)
            
            isCountryExist = await prisma.country.findFirst({
                where: {
                    name: capitalizedCountryName
                }
            })
    
            createdCountry
            if(!isCountryExist?.id && !countryId) {
                createdCountry = await prisma.country.create({
                    data: {
                        name: countryName as string,
                        description: '',
                        filename: '',
                        directory: ''
                    }
                })
            }
        }

        if(capitalizedCityName) {
            capitalizedCityName = cityName.slice(0,1).toUpperCase()
            capitalizedCityName = capitalizedCityName + cityName.slice(1)
            
            isCityExist = await prisma.city.findFirst({
                 where: {
                     name: capitalizedCityName
                 }
             })
     
             createdCity
             if(!isCityExist?.id && !cityId) {
                 createdCity = await prisma.city.create({
                     data: {
                         name: cityName,
                         countryId: createdCountry?.id as number,
                         directory: '',
                         filename: '',
                     }
                 })
             }
        }

        const isUserExist = await prisma.user.findUnique({
            where: {
                id,
            }
        })

        if(isUserExist?.role !== role) throw { msg: 'Role unauthorized!', status: 406 }

        const updatedUserProfile = await prisma.user.update({
            where: {
                id
            },
            data: {
                username,
                gender,
                phoneNumber,
                cityId: cityId ? Number(cityId) : createdCity?.id,
                countryId: countryId ? Number(countryId) : createdCountry?.id,
                birthDate: (year && month && date) ? new Date(`${year}-${month}-${date}`).toISOString() : null,
                address
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update user profile success',
            data: {
                email: updatedUserProfile?.email,
                username: updatedUserProfile?.username,
                gender: updatedUserProfile?.gender,
                phoneNumber: updatedUserProfile?.phoneNumber,
                cityName: cityName || createdCity?.name,
                countryName: countryName || createdCountry?.name,
                birthDate:  updatedUserProfile?.birthDate,
                year,
                month,
                date,
                address
            }
        })


    } catch (error) {
        next(error)
    }
}

export const updateUserProfilePicture = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            id = 'cm4tm1tsd00012dj3vrih9dzy', 
            role = 'USER'
        } = req.body
        
        const imagesUploaded: any = req.files

        const directory = imagesUploaded?.images[0].destination
        let filename = imagesUploaded?.images[0].filename.split('.')[0]
        let fileExtension = imagesUploaded?.images[0].filename.split('.')
        fileExtension = fileExtension[fileExtension.length - 1]

        const updatedUserProfilePicture = await prisma.user.update({
            where: {
                id
            },
            data: {
                filename,
                directory,
                fileExtension
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update user profile picture success',
            data: {
                profilePictureUrl: `http://localhost:5000/api/${updatedUserProfilePicture?.directory}/${updatedUserProfilePicture?.filename}.${updatedUserProfilePicture.fileExtension}`
            }
        })

    } catch (error) {
        next(error)
    }
}

export const deleteUserProfile = async(req: Request, res: Response, next: NextFunction) => {
    //apakah harus delete secara harfiah
    //atau delete secara ux saja
}